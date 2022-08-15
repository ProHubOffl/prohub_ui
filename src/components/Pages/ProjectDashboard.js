import React,{useState,useEffect} from 'react';
import AuthService from "../../service/authentication/AuthService";
import BacklogService from '../../service/backlog/BacklogService';
import ProjectService from '../../service/project/ProjectService';
import ProjectUserService from '../../service/user/ProjectUserService';
import AnnouncementService from '../../service/announcement/AnnouncementService';
import "../../Style/ProjectDashboard.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import BurnDownChart from './BurnDownChart';
import TeamTable from './TeamTable';
import {Link} from "react-router-dom";
import DocumentService from '../../service/document/DocumentService';
import Chart from "../../assets/chart.svg";
import Team from "../../assets/team.svg";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "85%",
  bgcolor: 'background.paper',
  border: '1px solid rgba(54, 113, 136, 0.568)',
  borderRadius: '20px',
  boxShadow: 10,
};
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "85%",
    bgcolor: 'background.paper',
    border: '1px solid rgba(54, 113, 136, 0.568)',
    borderRadius: '20px',
    boxShadow: 10,
  };

const ProjectDashboard = () => {
    const currentProject = localStorage.getItem("project") === null ? "" : AuthService.getCurrentProject().projectName
    const currentUser = AuthService.getCurrentUser().email;

    const[documentcount, setDocumentCount] = useState(0);
    const[announcecount, setAnnounceCount] = useState(0);
    const[project, setProject] = useState({})
    const[backlogs, setBacklogs] = useState([]);
    const[backlogError, setBacklogError] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const CalculateDays = (date1) => {
        var end = new Date(date1);
        var today= new Date();
        var ms = end.getTime() - today.getTime();
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms = ms % (24*60*60*1000);
        const hours = Math.floor(daysms / (60*60*1000));
        const hoursms = ms % (60*60*1000);
        const minutes = Math.floor(hoursms / (60*1000));
        const minutesms = ms % (60*1000);
        const sec = Math.floor(minutesms / 1000);
        if(days>0 || hours>0 || minutes>0 || sec>0)
            return "Remaining "+days + "Days " + hours + "Hours " + minutes + "Min ";
        else
            return "Project Allocation Time Finished"
    };

    const CurrentSprintDateRange = (date1, date2, sprints, days) => {
        var start = new Date(date1);
        var end = new Date(date2);
        var today= new Date();
        var lastdate = new Date(date1);
        var dates=[]
        var currentsprint=0;
        dates[0]=start;
        dates[sprints]=end;
        if(today > new Date(end)){
            return "-,"+"Project Expired"
        }
        if(today < new Date(start)){
            return "-,"+"Your Project is behind the Schedule"
        }
        for(var i=1; i<sprints ; i=i+1){
            dates[i] = new Date(lastdate.setDate(lastdate.getDate() + days));
        }
        for(var i=1 ; i<=sprints; i=i+1){
            currentsprint = currentsprint + 1
            if(today < dates[i] && today > dates[i-1]){
                var firstdate=dates[i-1]
                var lastdate=dates[i]
                break;
            }
        }
        return currentsprint+","+new Date(firstdate).getDate()+"/"+(new Date(firstdate).getMonth()+1)+"/"+new Date(firstdate).getFullYear()+" - "+new Date(lastdate).getDate()+"/"+(new Date(lastdate).getMonth()+1)+"/"+new Date(lastdate).getFullYear();
    }

    const calculateSprintCapacity = (date1, date2, sprints) => {
        var start = new Date(date1);
        var end = new Date(date2);
        var ms = end.getTime() - start.getTime();
        const days = Math.floor(ms / (24*60*60*1000*sprints));
        return days;
    }

    const AllocatedDays = (date1,date2) => {
        var start = new Date(date1);
        var end = new Date(date2);
        var ms = end.getTime() - start.getTime();
        const days = Math.floor(ms / (24*60*60*1000));
        return days;
    }

    const CalculateImprovementProgress = (tasks) => {
        var improve = 0;
        var improvetotal = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].type === 'IMPROVEMENT'){
                improvetotal =improvetotal+tasks[b].storyPoints
                if(tasks[b].status === 'APPROVED'){
                    improve =improve+tasks[b].storyPoints
                }
                count=count+1
            }
        }
        return count?(improve+"/"+improvetotal):"Improvements Empty";
    }

    const CalculateImprovementProgressBar = (tasks) => {
        var improve = 0;
        var improvetotal = 0;
        for(let b in tasks){
            if(tasks[b].type === 'IMPROVEMENT'){
                improvetotal =improvetotal+tasks[b].storyPoints
                if(tasks[b].status === 'APPROVED'){
                    improve =improve+tasks[b].storyPoints
                }
            }
        }
        if(improve===0 && improvetotal===0){
            var answer = 0;
        }else{
            var answer=improve/improvetotal
        }
        return answer
    }

    const CalculateStoryProgress = (tasks) => {
        var story = 0;
        var storytotal = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].type === 'STORY'){
                storytotal =storytotal+tasks[b].storyPoints
                if(tasks[b].status === 'APPROVED'){
                    story =story+tasks[b].storyPoints
                }
                count=count+1
            }
        }
        return count?(story+"/"+storytotal):"Stories Empty";
    }

    const CalculateStoryProgressBar = (tasks) => {
        var story = 0;
        var storytotal = 0;
        for(let b in tasks){
            if(tasks[b].type === 'STORY'){
                storytotal =storytotal+tasks[b].storyPoints
                if(tasks[b].status === 'APPROVED'){
                    story =story+tasks[b].storyPoints
                }
            }
        }
        if(story===0 && storytotal===0){
            var answer = 0;
        }else{
            var answer=story/storytotal
        }
        return answer
    }

    const CalculateBugProgress = (tasks) => {
        var bug = 0;
        var bugtotal = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].type === 'BUG'){
                bugtotal =bugtotal+tasks[b].storyPoints
                if(tasks[b].status === 'APPROVED'){
                    bug =bug+tasks[b].storyPoints
                }
                count=count+1
            }
        }
        return count?(bug+"/"+bugtotal):"Bugs Empty";
    }

    const CalculateBugProgressBar = (tasks) => {
        var bug = 0;
        var bugtotal = 0;
        for(let b in tasks){
            if(tasks[b].type === 'BUG'){
                bugtotal =bugtotal+tasks[b].storyPoints
                if(tasks[b].status === 'APPROVED'){
                    bug =bug+tasks[b].storyPoints
                }
            }
        }
        if(bug===0 && bugtotal===0){
            var answer = 0;
        }else{
            var answer=bug/bugtotal
        }
        return answer
    }
    
    const CalculateProjectProgress = (tasks) => {
        var approved = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].status === 'APPROVED'){
                approved =approved+tasks[b].storyPoints
            }
            count=count+1
        }
        return approved;
    }
    const Allocatedstorypoints = () =>{
        var usingpoints = 0;
        for(let b in backlogs){
            usingpoints=(usingpoints + backlogs[b].storyPoints)
        }
        return usingpoints;
    }

    const loadPageData = (projectName) => {
        ProjectService.getProjectByProjectName(projectName)
        .then(response => {
            setProject(response.data)
        })
        .catch(err => {
            console.log(err)
        })
        
        BacklogService.getBacklogByProject(projectName)
        .then(response => {
          setBacklogs(response.data)
        })
        .catch(err => {
          setBacklogError('Unable to fetch backlog list at the moment')
        });

        DocumentService.getDocumentCountByProject(projectName)
        .then(response => {
            setDocumentCount(response.data)
        })
        .catch(err => {
            console.log(err)
        })

        AnnouncementService.getAnnouncementCountByProject(projectName)
        .then(response => {
            setAnnounceCount(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(localStorage.getItem("project") === null){
            ProjectUserService.getProjectsByUser(currentUser)
            .then(res => {
                localStorage.setItem("project", JSON.stringify(res.data[0]));
                loadPageData(res.data[0].projectName)
            })
            .catch(err => console.log(err))
        } else {
            loadPageData(currentProject)
        }
    },[])
    //new Date()

    return (
        <div>
            <div className="sub_header px-4">
                <h3>Project&nbsp;Dashboard</h3><span className='pendingtime'>{CalculateDays(project.endDate)}</span>
                <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
            </div>

            <div className="row numdata">
                <div className="col-6 col-md-3 cell1">
                    <span className="boxtitle">Total Sprints</span><br/>
                    <span className="boxdata">{project.totalSprints}</span><br/>
                    <span className="dataunit">One Sprint = {calculateSprintCapacity(project.startDate,project.endDate,project.totalSprints)} Days</span>
                </div>
                <div className="col-6 col-md-3 cell2">
                    <span className="boxtitle">Current Sprint</span><br/>
                    <span className="boxdata">{(CurrentSprintDateRange(project.startDate,project.endDate,project.totalSprints,calculateSprintCapacity(project.startDate,project.endDate,project.totalSprints)).split(','))[0]}</span><br/>
                    <span className="dataunit">{(CurrentSprintDateRange(project.startDate,project.endDate,project.totalSprints,calculateSprintCapacity(project.startDate,project.endDate,project.totalSprints)).split(','))[1]}</span>
                </div>
                <div className="col-6 col-md-3 cell3">
                    <span className="boxtitle">Allocated Time</span><br/>
                    <span className="boxdata">{AllocatedDays(project.startDate,project.endDate)}</span><br/>
                    <span className="dataunit">days</span>
                </div>
                <div className="col-6 col-md-3 cell4">
                    <span className="boxtitle">Allocated Tasks</span><br/>
                    <span className="boxdata">{backlogs.length}</span><br/>
                    <span className="dataunit">Allocated StoryPoints : {Allocatedstorypoints()}/{project.storyPoints}</span>
                </div>
            </div>

            <div className="row progressdata">
                <div className="col-6 col-md-3 cell5">
                    <span className="boxtitle">Project Progress</span>
                    <ProgressBar className='progressbar' variant="success" now={CalculateProjectProgress(backlogs)/project.storyPoints*100} label={`${(CalculateProjectProgress(backlogs)/project.storyPoints*100).toFixed(1)}%`} />
                    <span className="data">{CalculateProjectProgress(backlogs)}/{project.storyPoints}</span>
                </div>
                <div className="col-6 col-md-3 cell6">
                    <span className="boxtitle">Bugs Progress</span>
                    <ProgressBar className='progressbar' variant="danger" now={CalculateBugProgressBar(backlogs)*100} label={`${(CalculateBugProgressBar(backlogs)*100).toFixed(1)}%`} />
                    <span className="data">{CalculateBugProgress(backlogs)}</span>
                </div>
                <div className="col-6 col-md-3 cell7">
                    <span className="boxtitle">Improvements Progress</span>
                    <ProgressBar className='progressbar' variant="warning" now={CalculateImprovementProgressBar(backlogs)*100} label={`${(CalculateImprovementProgressBar(backlogs)*100).toFixed(1)}%`} />
                    <span className="data">{CalculateImprovementProgress(backlogs)}</span>
                </div>
                <div className="col-6 col-md-3 cell8">
                    <span className="boxtitle">Stories Progress</span>
                    <ProgressBar className='progressbar' variant="info" now={CalculateStoryProgressBar(backlogs)*100} label={`${(CalculateStoryProgressBar(backlogs)*100).toFixed(1)}%`} />
                    <span className="data">{CalculateStoryProgress(backlogs)}</span>
                </div>
            </div>

            <div className="row numdata">
                <div className="col-6 col-md-3 cell1">
                    <span className="boxtitle">Total Documents</span><br/>
                    <span className="boxdata">{documentcount}</span><br/>
                    <span className="dataunit"><Link to="/Document" className='linktext'>Click to View</Link></span>
                </div>
                <div className="col-6 col-md-3 cell2">
                    <span className="boxtitle">Total Announcements</span><br/>
                    <span className="boxdata">{announcecount}</span><br/>
                    <span className="dataunit"><Link to="/Announcement" className='linktext'>Click to View</Link></span>
                </div>
                <div className="col-6 col-md-3 cell3">
                    <span className="boxtitle">Burn Down Chart</span><br/>
                    <span className="boxdata" onClick={handleOpen1}><img className='dashimg1' src={Chart} alt="Chart" /></span><br/>
                    <span className="dataunit viewmodal" onClick={handleOpen1}>Click to View</span>
                </div>
                <div className="col-6 col-md-3 cell4">
                    <span className="boxtitle">Team Details</span><br/>
                    <span className="boxdata" onClick={handleOpen2}><img className='dashimg2' src={Team} alt="Team" /></span><br/>
                    <span className="dataunit viewmodal" onClick={handleOpen2}>Click to View</span>
                </div>
            </div>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <BurnDownChart project={project} backlogs={backlogs} days={calculateSprintCapacity(project.startDate,project.endDate,project.totalSprints)}/>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TeamTable project={project} backlogs={backlogs}/>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ProjectDashboard;
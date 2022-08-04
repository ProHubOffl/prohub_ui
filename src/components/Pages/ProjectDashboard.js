import React,{useState,useEffect} from 'react';
import AuthService from "../../service/authentication/AuthService";
import BacklogService from '../../service/backlog/BacklogService';
import ProjectService from '../../service/project/ProjectService';
import ProjectUserService from '../../service/user/ProjectUserService';
import "../../Style/ProjectDashboard.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import BurnDownChart from './BurnDownChart';

const ProjectDashboard = () => {
    const selectedproject = AuthService.getCurrentProject()
    const[users, setUsers] = useState([]);
    const[project, setProject] = useState({})
    const[userError, setUserError] = useState('');
    const[backlogs, setBacklogs] = useState([]);
    const[backlogError, setBacklogError] = useState('');

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
        if(days || hours || minutes || sec)
            return days + "Days " + hours + "Hours " + minutes + "Min " + sec + "Sec ";
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
        for(var i=1; i<sprints ; i=i+1){
            dates[i] = new Date(lastdate.setDate(lastdate.getDate() + days));
        }
        if(today > dates[sprints] || today < dates[0]){
            return "-,"+"Project Expired"
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
            if(tasks[b].type == 'IMPROVEMENT'){
                improvetotal =improvetotal+tasks[b].storyPoints
                if(tasks[b].status == 'APPROVED'){
                    improve =improve+tasks[b].storyPoints
                }
                count=count+1
            }
        }
        return count?(improve+"/"+improvetotal):"No Improve Ticket";
    }

    const CalculateStoryProgress = (tasks) => {
        var story = 0;
        var storytotal = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].type == 'STORY'){
                storytotal =storytotal+tasks[b].storyPoints
                if(tasks[b].status == 'APPROVED'){
                    story =story+tasks[b].storyPoints
                }
                count=count+1
            }
        }
        return count?(story+"/"+storytotal):"No Story Tickets";
    }

    const CalculateBugProgress = (tasks) => {
        var bug = 0;
        var bugtotal = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].type == 'BUG'){
                bugtotal =bugtotal+tasks[b].storyPoints
                if(tasks[b].status == 'APPROVED'){
                    bug =bug+tasks[b].storyPoints
                }
                count=count+1
            }
        }
        return count?(bug+"/"+bugtotal):"No Bug Tickets";
    }

    const CalculateProjectProgress = (tasks) => {
        var approved = 0;
        var count=0
        for(let b in tasks){
            if(tasks[b].status == 'APPROVED'){
                approved =approved+tasks[b].storyPoints
            }
            count=count+1
        }
        return approved;
    }

    useEffect(() => {
        ProjectService.getProjectByProjectName(selectedproject.projectName)
        .then(response => {
            setProject(response.data)
        })
        .catch(err => {
            console.log(err)
        })
        
        BacklogService.getBacklogByProject(selectedproject.projectName)
        .then(response => {
          setBacklogs(response.data)
        })
        .catch(err => {
          setBacklogError('Unable to fetch backlog list at the moment')
        });

    },[])
    //new Date()

    return (
        <div>
            <div className="sub_header px-4">
                <h3>Project&nbsp;Dashboard</h3><span className='pendingtime'>{CalculateDays(project.endDate)}</span>
                <p className="fw-bold">Project / <span className="fw-bolder">{selectedproject.projectName}</span></p>
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
                    <span className="dataunit">Total StoryPoints {project.storyPoints}</span>
                </div>
            </div>

            <div className="row progressdata">
                <div className="col-6 col-md-3 cell5">
                    <span className="boxtitle">Project Progress</span>
                    <ProgressBar className='progressbar' variant="success" now={CalculateProjectProgress(backlogs)/project.storyPoints*100} label={`${(CalculateProjectProgress(backlogs)/project.storyPoints*100).toFixed(1)}%`} />
                    <span className="data">{CalculateProjectProgress(backlogs)}/{project.storyPoints}</span>
                </div>
                <div className="col-6 col-md-3 cell6">
                    <span className="boxtitle">Bug Tasks Progress</span>
                    <ProgressBar className='progressbar' variant="danger" now={CalculateBugProgress(backlogs).split('/')[0]/CalculateBugProgress(backlogs).split('/')[1]*100} label={`${(CalculateBugProgress(backlogs).split('/')[0]/CalculateBugProgress(backlogs).split('/')[1]*100).toFixed(1)}%`} />
                    <span className="data">{CalculateBugProgress(backlogs)}</span>
                </div>
                <div className="col-6 col-md-3 cell7">
                    <span className="boxtitle">Improve Tasks Progress</span>
                    <ProgressBar className='progressbar' variant="warning" now={CalculateImprovementProgress(backlogs).split('/')[0]/CalculateImprovementProgress(backlogs).split('/')[1]*100} label={`${(CalculateImprovementProgress(backlogs).split('/')[0]/CalculateImprovementProgress(backlogs).split('/')[1]*100).toFixed(1)}%`} />
                    <span className="data">{CalculateImprovementProgress(backlogs)}</span>
                </div>
                <div className="col-6 col-md-3 cell8">
                    <span className="boxtitle">Story Tasks Progress</span>
                    <ProgressBar className='progressbar' variant="info" now={CalculateStoryProgress(backlogs).split('/')[0]/CalculateStoryProgress(backlogs).split('/')[1]*100} label={`${(CalculateStoryProgress(backlogs).split('/')[0]/CalculateStoryProgress(backlogs).split('/')[1]*100).toFixed(1)}%`} />
                    <span className="data">{CalculateStoryProgress(backlogs)}</span>
                </div>
            </div>
            <BurnDownChart project={project} backlogs={backlogs} days={calculateSprintCapacity(project.startDate,project.endDate,project.totalSprints)}/>
        </div>
    );
};

export default ProjectDashboard;

// https://technext.github.io/purple-react/dashboard
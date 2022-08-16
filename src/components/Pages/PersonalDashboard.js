import React,{useState,useEffect} from 'react';
import AuthService from '../../service/authentication/AuthService';
import "../../Style/PersonalDashboard.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import BacklogService from '../../service/backlog/BacklogService';
import ProjectUserService from '../../service/user/ProjectUserService';

const PersonalDashboard = () => {
    const email = AuthService.getCurrentUser().email
    const[projects, setProject] = useState([])
    const[projectError, setProjectError] = useState('');
    const[backlogs, setBacklogs] = useState([]);
    const[backlogError, setBacklogError] = useState('');
    
    useEffect(() => {
        ProjectUserService.getProjectsByUser(email)
        .then(response => {
            setProject(response.data)
        })
        .catch(err => {
            setProjectError('Unable to fetch backlog list at the moment')
        })

        BacklogService.getBacklogbyEmail(email)
        .then(response => {
          setBacklogs(response.data)
        })
        .catch(err => {
          setBacklogError('Unable to fetch backlog list at the moment')
        });
    },[])
    
    const GetAlloctatedTasks =  (projectname,bool) => {
        var totaltask = 0;
        var approved = 0
        for(let b in backlogs){
            if (backlogs[b].projectName === projectname)
                {
                    if(bool)
                    {totaltask=totaltask+1}
                    if (backlogs[b].status === "APPROVED" && !bool)
                        {approved = approved + 1}
                }
            
        }
        return bool ? totaltask : approved
    }

    const Getprogress = (projectname) => {
        var totalstorypoint = 0;
        var storypoints = 0;
        for(let b in backlogs){
            if (backlogs[b].projectName === projectname)
                {
                    totalstorypoint = totalstorypoint + backlogs[b].storyPoints
                    if (backlogs[b].status === "APPROVED")
                        {storypoints = storypoints + backlogs[b].storyPoints}
                }
        }
        return storypoints+"/"+totalstorypoint;
    }

    const GetprogressBar = (projectname) => {
        var totalstorypoint = 0;
        var storypoints = 0;
        for(let b in backlogs){
            if (backlogs[b].projectName === projectname)
                {
                    totalstorypoint = totalstorypoint + backlogs[b].storyPoints
                    if (backlogs[b].status === "APPROVED")
                        {storypoints = storypoints + backlogs[b].storyPoints}
                }
        }
        if(totalstorypoint==0 && storypoints==0){
            var answer = 0;
        }else{
            var answer = storypoints/totalstorypoint
        }
        return answer
    }

    const GetTicketDetails = (projectname,boolean) => {
        var totalbug = 0;
        var bug = 0
        var totalimprove = 0
        var improve = 0
        var totalstory = 0
        var story = 0
        for(let b in backlogs){
            if (backlogs[b].projectName === projectname){
                if (backlogs[b].type === "BUG")
                    {
                        if(boolean)
                            {totalbug = totalbug + 1}
                        if (backlogs[b].status === "APPROVED" && !boolean)
                            {bug = bug + 1}
                    }
                if (backlogs[b].type === "IMPROVEMENT")
                    {
                        if(boolean)
                            {totalimprove = totalimprove + 1}
                        if (backlogs[b].status === "APPROVED" && !boolean)
                            {improve = improve + 1}
                    }
                if (backlogs[b].type === "STORY")
                    {
                        if(boolean)
                        {totalstory = totalstory + 1}
                        if (backlogs[b].status === "APPROVED" && !boolean)
                            {story = story + 1}
                    } 
            }
        }
        return (boolean) ? ("Bug-"+totalbug+" | Improvement-"+totalimprove+" | Story-"+totalstory) : ("Bug-"+bug+" | Improvement-"+improve+" | Story-"+story)
    }

    return (
        <div>
            <div className="sub_header px-4">
                <h3>Personal&nbsp;Dashboard</h3>
                <p className="fw-bold">{AuthService.getCurrentUser().firstName}&nbsp;{AuthService.getCurrentUser().lastName}&nbsp;-&nbsp;{AuthService.getCurrentUser().designation}</p>
            </div>

            {
                projects.map((project,index)=>(  
                    <div className="row numdata" key={index}>
                        <div className="col-6 col-md-3 cell1">
                            <span className="boxtitle">Project Name</span><br/>
                            <span className="boxdata dashboardprojectname">{project.projectName.length>11 ? (project.projectName.slice(0,11)+".."):project.projectName}</span><br/>
                            <span className="dataunit teamname">Role : {project.role}</span>
                        </div>
                        <div className="col-6 col-md-3 cell2">
                            <span className="boxtitle">Assigned Tasks</span><br/>
                            <span className="boxdata">{GetAlloctatedTasks(project.projectName,true)}</span><br/>
                            <span className="dataunit">{GetTicketDetails(project.projectName,true)}</span>
                        </div>
                        <div className="col-6 col-md-3 cell3">
                            <span className="boxtitle">Completed Tasks</span><br/>
                            <span className="boxdata">{GetAlloctatedTasks(project.projectName,false)}</span><br/>
                            <span className="dataunit">{GetTicketDetails(project.projectName,false)}</span>
                        </div>
                        <div className="col-6 col-md-3 cell8">
                            <span className="boxtitle">Progress</span>
                            <ProgressBar className='progressbar' variant="success" now={GetprogressBar(project.projectName)*100} label={`${((GetprogressBar(project.projectName)*100).toFixed(1))}%`} />
                            <span className="data">{Getprogress(project.projectName)}</span>
                        </div>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
};

export default PersonalDashboard;
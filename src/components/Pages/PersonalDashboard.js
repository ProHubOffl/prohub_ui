import React,{useState,useEffect} from 'react';
import AuthService from '../../service/authentication/AuthService';
import "../../Style/PersonalDashboard.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import ProjectService from '../../service/project/ProjectService';
import BacklogService from '../../service/backlog/BacklogService';
import ProjectUserService from '../../service/user/ProjectUserService';

const PersonalDashboard = () => {
    const selectedproject = AuthService.getCurrentProject()
    const email = AuthService.getCurrentUser().email

    const[projects, setProject] = useState([])
    const[userError, setUserError] = useState('');
    const[backlogs, setBacklogs] = useState([]);
    const[backlogError, setBacklogError] = useState('');
    
    useEffect(() => {
        ProjectUserService.getProjectsByUser(email)
        .then(response => {
            setProject(response.data)
        })
        .catch(err => {console.log(err)})
    },[])

    const getBacklogdata = (projectname) => {
        BacklogService.getBacklogByProjectAndEmail(projectname,email)
        .then(response => {
          setBacklogs(response.data)
        })
        .catch(err => {
          setBacklogError('Unable to fetch backlog list at the moment')
        });
        return backlogs;
    }

    const getTeamName = (projectname) => {
        var team='undefined'
        ProjectService.getProjectByProjectName(projectname)
        .then(response => {
            var team=(response.data.teamName)
        })
        .catch(err => {
            console.log(err)
        })
        return team;
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
                            <span className="dataunit teamname">Team {getTeamName(project.projectName)}</span>
                        </div>
                        <div className="col-6 col-md-3 cell2">
                            <span className="boxtitle">Assigned Tasks</span><br/>
                            <span className="boxdata">18</span><br/>
                            <span className="dataunit">Bug-3 | Improvement-5 | Story-10</span>
                        </div>
                        <div className="col-6 col-md-3 cell3">
                            <span className="boxtitle">Completed Tasks</span><br/>
                            <span className="boxdata">10</span><br/>
                            <span className="dataunit">Bug-3 | Improvement-4 | Story-3</span>
                        </div>
                        <div className="col-6 col-md-3 cell8">
                            <span className="boxtitle">Progress</span>
                            <ProgressBar className='progressbar' variant="success" now={50} label={`${(50.0)}%`} />
                            <span className="data">50/100</span>
                        </div>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
};

export default PersonalDashboard;
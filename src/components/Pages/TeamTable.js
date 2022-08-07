import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import AuthService from '../../service/authentication/AuthService';
import ProjectUserService from '../../service/user/ProjectUserService';
import UserService from '../../service/user/UserService';
import ProgressBar from 'react-bootstrap/ProgressBar';

function TeamTable(props) {
    const selectedproject = AuthService.getCurrentProject()
    const[users, setUsers] = useState([]);
    const[userError, setUserError] = useState('');
    const[usernameError, setUserNameError] = useState('');

    const Assignedtasks = (email,tasks) => {
        var count_task = 0
        var approved = 0
        for(let b in tasks){
            if(tasks[b].assignee == email){
                count_task = count_task + 1
                if(tasks[b].status == 'APPROVED'){
                    approved=approved+1
                }
            }
        }
        return approved+"/"+count_task
    }

    const CalculateUserProgress = (email,tasks) => {
        var approved = 0;
        var total=0
        for(let b in tasks){
            if(tasks[b].status == 'APPROVED' && tasks[b].assignee == email){
                approved =approved+tasks[b].storyPoints
            }
            if(tasks[b].assignee == email){
                total = total + tasks[b].storyPoints
            }
            
        }
        return approved+"/"+total;
    }

    useEffect(() => {
        debugger;
        ProjectUserService.getProjectUserRoles(selectedproject.projectName)
        .then(response => {
            setUsers(response.data)
            if(response.data.length < 0) {
                setUserError("No users Have been assigned to this project")
            }
        })
        .catch(err => {
            setUserError("Unable to fetch the project user roles at the moment")
        })

    },[])

    return (
        <>
        <div className='tablecomponent'>
            <Table striped>
            <caption>We Are Team {props.project.teamName}</caption>
            <thead>
                <tr>
                <th className='email'>Email</th>
                <th className='Assigned'>Assigned Tasks</th>
                <th className='Completed'>Completed Tasks</th>
                <th className='tablebarcell'>Progress</th>
                <th className='score'>Score</th>
                </tr>
            </thead>
            <tbody>
            {
                users.map((user,index)=>(  
                <tr key={index} className="tablecell">
                <td className="tablecell email">{user.email}</td>
                <td className="tablecell Assigned">{Assignedtasks(user.email,props.backlogs).split('/')[1]}</td>
                <td className="tablecell Completed">{Assignedtasks(user.email,props.backlogs).split('/')[0]}</td>
                <td><ProgressBar className='tablebar' variant="success" now={((CalculateUserProgress(user.email,props.backlogs).split('/')[0]/CalculateUserProgress(user.email,props.backlogs).split('/')[1])*100)} label={`${((CalculateUserProgress(user.email,props.backlogs).split('/')[0]/CalculateUserProgress(user.email,props.backlogs).split('/')[1]*100).toFixed(1))}%`} /></td>
                <td className="tablecell score">{CalculateUserProgress(user.email,props.backlogs)}</td>
                </tr>
                ))
            }
            </tbody>
            </Table>
        </div>
        </>
    );
}

export default TeamTable;

// sampleuser@email.com
// ssivanujan1998@gmail.com
// userfour@email.com
// userone@email.com
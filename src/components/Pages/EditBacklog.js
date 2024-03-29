import React, { useState,useEffect } from 'react';
import "../../Style/Backlog.css";
import AuthService from '../../service/authentication/AuthService'
import BacklogService from "../../service/backlog/BacklogService";
import { toast, ToastContainer } from 'react-toastify';
import ProjectService from '../../service/project/ProjectService';
import ProjectUserService from '../../service/user/ProjectUserService';

function EditBacklog(props) {

    const currentUser = AuthService.getCurrentUser();
    const currentProject = AuthService.getCurrentProject().projectName

    const oldTitle = props.backlog.title;
    const oldAssignee = props.backlog.assignee;
    const oldSprint = props.backlog.sprint;
    const oldStoryPoints = props.backlog.storyPoints;
    const oldDescription = props.backlog.description;
    const oldType = props.backlog.type;
    const oldStatus = props.backlog.status;
  
    const[title, setTitle] = useState('');
    const[assignee, setAssignee] = useState('');
    const[sprint, setSprint] = useState('');
    const[storyPoints, setStoryPoints] = useState('');
    const[description, setDescription] = useState('');
    const[type, setType] = useState('');
    const[status, setStatus] = useState('');
    const[project, setProject] = useState([]);
    const[backlogs, setBacklogs] = useState([]);
    const[backlogError, setBacklogError] = useState('');
    const[projectUsers, setProjectUsers] = useState([]);
    const[userError,setUserError] = useState('')

    const updateBacklogItem = (e) => {
        debugger
        e.preventDefault()
        const modifiedBacklog = {
            title: title === '' ? oldTitle : title,
            description: description === '' ? oldDescription : description,
            projectName: props.backlog.projectName,
            sprint: sprint === '' ? parseInt(oldSprint) : parseInt(sprint),
            createdBy: props.backlog.createdBy,
            assignee: assignee === '' ? oldAssignee : assignee,
            status: status === '' ? oldStatus :  status,
            createdAt: props.backlog.createdAt,
            storyPoints: storyPoints === '' ? parseInt(oldStoryPoints) : parseInt(storyPoints),
            lastUpdated: new Date().toLocaleString(),
            lastUpdatedUser: currentUser.email,
            type: type === '' ? oldType : type
        }
        console.log(modifiedBacklog)
        BacklogService.updateBacklogItem(modifiedBacklog, props.backlog.backlogId)
        .then(response => {
            toast.success('Backlog Element Updated Successfully', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload()
            setTitle('')
            setAssignee('')
            setSprint('')
            setStoryPoints('')
            setDescription('')
            setType('')
            setStatus('')
        })
        .catch(err => {
            toast.error('Unable to proceed your request', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    useEffect(() => {
        ProjectService.getProjectByProjectName(currentProject)
        .then(response => {
            setProject(response.data)
        })
        .catch(err => {
            console.log(err)
        })

        BacklogService.getBacklogByProject(currentProject)
        .then(response => {
          setBacklogs(response.data)
        })
        .catch(err => {
          setBacklogError('Unable to fetch backlog list at the moment')
        });
        ProjectUserService.getProjectUserRoles(currentProject)
        .then(response => {
        setProjectUsers(response.data)
        })
        .catch(err => {
        setUserError('Unable to fetch project user roles at the moment')
        })
      },[])

const CalculatePoints = () => {
    var usingpoints = 0;
    var totalpoints = project.storyPoints
    var displaycount

    for(let b in backlogs){
        usingpoints=(usingpoints + backlogs[b].storyPoints)
      }
      displaycount = totalpoints-usingpoints;
      return (displaycount)+" Storypoints Remaining"
}

const GetMaximum = () => {
    var max =(parseInt(CalculatePoints().split(' ')[0])+oldStoryPoints)
    return max
}

    return (
        <div className="project-form">
            <div className="modal-dialog modal-dialog modal-lg">
                <form onSubmit={updateBacklogItem}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bolder" id="CreateUser">Edit Backlog</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div >
                            {/* 1st row */}
                            <div className="row">
                              <div className="col-md-4">
                                  <label for="mail" className="form-label">Title *</label>
                                  <div className="input-group">
                                  <input type="text" className="form-control" maxlength="25" id="title" placeholder="Enter the Title" defaultValue={props.backlog.title} onChange={(e) => setTitle(e.target.value)}/>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                <label for="status" className="form-label">Status *</label>
                                <div className="input-group">
                                    <select className="form-select border-secondary" id="inputGroupSelect02" defaultValue={props.backlog.status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="" selected hidden>{props.backlog.status}</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="FINISHED">FINSIHED</option>
                                        <option value="APPROVED">APPROVED</option>
                                    </select>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label for="mail" className="form-label">Backlog Type *</label>
                                <div className="input-group">
                                    <select className="form-select border-secondary" id="inputGroupSelect02" defaultValue={props.backlog.type} onChange={(e) => setType(e.target.value)}>
                                        <option value="" selected hidden>{props.backlog.type}</option>
                                        <option value="BUG">Bug</option>
                                        <option value="STORY">Story</option>
                                        <option value="IMPROVEMENT">Improvement</option>
                                    </select>
                                </div>
                              </div>
                            </div>
                            {/* 2nd row */}
                            <div className="row"> 
                            <div className="col-md-4">
                                <label for="assignee" className="form-label">Assignee </label>
                                <select className="form-select border-secondary" id="inputGroupSelect02" onChange={(e) => setAssignee(e.target.value)} defaultValue={props.backlog.assignee} >
                                        <option value="" selected hidden>{props.backlog.assignee}</option>
                                        {
                                        projectUsers.map(user => {
                                            return(
                                            <option value={user.email}>{user.email}</option>
                                            )
                                        })
                                        }
                                    </select>
                            </div>
                              <div className="col-md-4">
                                  <label for="sprint" className="form-label">Sprint *</label>
                                  <input type="number" className="form-control" id="sprint" placeholder="Enter sprint" defaultValue={props.backlog.sprint} onChange={(e)=>setSprint(e.target.value)} min={1} max={project.totalSprints}/>
                              </div>
                              <div className="col-md-4">
                                <label for="storyPoints" className="form-label">Story Points</label>
                                <input type="number" className="form-control" id="storyPoints" placeholder="Enter story points" defaultValue={props.backlog.storyPoints} onChange={(e) => setStoryPoints(e.target.value)} min={1} max={GetMaximum()}/>
                                <span className="validation_message">{CalculatePoints()}</span>
                              </div>
                            </div>
                            {/* 3rd row */}
                            <div className="row">
                            <div className="col-md-12">
                                <label for="description" className="form-label">Description *</label> <br></br>
                                <textarea width="100%" rows="9" className="form-control border-secondary" id="description" placeholder="Enter description" defaultValue={props.backlog.description} onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                            </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create" onClick={()=>{}}>Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default EditBacklog;
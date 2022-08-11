import React, {useState, useEffect} from "react";
import AuthService from '../../service/authentication/AuthService'
import BacklogService from "../../service/backlog/BacklogService";
import "../../Style/Backlog.css";
import { toast, ToastContainer } from 'react-toastify';
import ProjectUserService from "../../service/user/ProjectUserService";
import ProjectService from "../../service/project/ProjectService";

const Backlog = () => {
  const currentUser = AuthService.getCurrentUser();
  const currentProject = AuthService.getCurrentProject().projectName

  const[title, setTitle] = useState('');
  const[assignee, setAssignee] = useState('');
  const[sprint, setSprint] = useState('');
  const[storyPoints, setStoryPoints] = useState('');
  const[description, setDescription] = useState('');
  const[type, setType] = useState('');
  const[backlogs, setBacklogs] = useState([]);
  const[backlogError, setBacklogError] = useState('');
  const[projectUsers, setProjectUsers] = useState([]);
  const[project, setProject] = useState([]);
  const[remainingpoints, setRemainingpoints] = useState();
  const[userError,setUserError] = useState('')

  useEffect(() => {
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

    ProjectService.getProjectByProjectName(currentProject)
    .then(response => {
        setProject(response.data)
        setRemainingpoints(response.data.storyPoints)
    })
    .catch(err => {
        console.log(err)
    })

  },[])

  const addBacklogItem = e => {
    e.preventDefault();
    const newBacklogItem = {
      title,
      description,
      projectName: currentProject,
      sprint: parseInt(sprint),
      createdBy: currentUser.email,
      assignee,
      status: 'TO_DO',
      createdAt: new Date().toUTCString(),
      storyPoints: parseInt(storyPoints),
      type
    }
    console.log(newBacklogItem)
    BacklogService.addBacklogItem(newBacklogItem)
    .then(response => {
      toast.success('Backlog Element Added Successfully', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      window.location.replace("/board")
      setTitle('')
      setAssignee('')
      setSprint('')
      // setStoryPoints('')
      setDescription('')
      setType('')
    })
    .catch(err => {
      console.log(err)
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

const CalculatePoints = (boolean) => {
  var remain_Points=remainingpoints
  for(let b in backlogs){
    remain_Points=(remain_Points - backlogs[b].storyPoints)
  }

  if(storyPoints > remain_Points || storyPoints < 0){
    var str = "Invalid Value"
    return boolean ? str : remain_Points ;
  }else{
    var points = remain_Points-storyPoints
    return boolean ? ((points)+" Storypoints Remaining") : points
  }
}

  return(
    <div className="backlog">
      <div className="sub_header px-4">
        <h3>Backlog</h3>
        <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
      </div>

      <div className="container pt-2">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <form className="backlog_left" onSubmit={addBacklogItem}>
              <div >
                {/* 1st row */}
                <div className="row">
                  <div className="col-md-4">
                      <label for="mail" className="form-label">Title *</label>
                      <div className="input-group">
                      <input type="text" className="form-control" id="title" placeholder="Enter the Title" onChange={(e) => setTitle(e.target.value)} required/>
                      </div>
                  </div>
                  <div className="col-md-4">
                    <label for="mail" className="form-label">Project *</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="projectName" placeholder="Enter Project Name" value={currentProject} readOnly required/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label for="mail" className="form-label">Backlog Type *</label>
                    <div className="input-group">
                        <select className="form-select border-secondary" id="inputGroupSelect02" onChange={(e) => setType(e.target.value)} required>
                            <option value="" selected hidden>Select Type</option>
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
                      <select className="form-select border-secondary" id="inputGroupSelect02" onChange={(e) => setAssignee(e.target.value)} required>
                            <option value="" selected hidden>Select Assignee</option>
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
                      <input type="number" className="form-control" id="sprint" placeholder="Enter sprint" onChange={(e) => setSprint(e.target.value)} min={1} max={project.totalSprints} required/>
                  </div>
                  <div className="col-md-4">
                    <label for="storyPoints" className="form-label">Story Points</label>
                    <input type="number" className="form-control" id="storyPoints" placeholder="Enter story points" onChange={(e) => setStoryPoints(e.target.value)} min={1} max={CalculatePoints(false)} required/>
                    <span className="validation_message">{CalculatePoints(true)}</span>
                  </div>
                </div>
                {/* 3rd row */}
                <div className="row">
                <div className="col-md-12">
                    <label for="description" className="form-label">Description *</label> <br></br>
                    <textarea width="100%" rows="9" className="form-control border-secondary" id="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} required>
                    </textarea>
                </div>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
                <button type="submit" className="btn btn-primary fw-bolder" id="btn-backlog-create">Create</button>
              </div>
            </form>
          </div>
          
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="backlog_right">
              <div className="backlog_right_body">
                  {
                    backlogError.length > 0 ?
                    <div id="backlog-error">{backlogError}</div>
                    :
                    backlogs.map(backlog => {
                      var backlog_state = '';
                      var backlog_color_id = '';
                      if (backlog.status === 'TO_DO') {
                        backlog_state = 'TO DO';
                        backlog_color_id = 'todo-backlog'
                      } else if (backlog.status === 'IN_PROGRESS') {
                        backlog_state = 'IN PROGRESS';
                        backlog_color_id = 'in-progress-backlog'
                      } else if (backlog.status === 'FINISHED') {
                        backlog_state = 'FINISHED';
                        backlog_color_id = 'done-backlog'
                      } else if (backlog.status === 'APPROVED') {
                        backlog_state = 'APPROVED';
                        backlog_color_id = 'approved-backlog'
                      }
                      return (
                        <div className="backlog-card fw-bold">
                          <div className="row">
                            <div className="col-md-9">
                              <p className="m-1">{backlog.title}<span style={{fontStyle:'bold',fontWeight:'500',float:'right'}}>Sprint {backlog.sprint}</span></p>
                            </div>
                            <div className="col-md-2" id={backlog_color_id}>
                              <p>{backlog_state}</p>
                            </div>
                            <div className="col-md-1" id="backlog-icon">
                              <button className="btn" ><a href={`Backlog/${backlog.backlogId}`}><i className="bi bi-pencil-square"></i></a></button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
              </div>
            </div>
          </div>
        </div>
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
};

export default Backlog;
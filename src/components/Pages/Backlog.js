import React, {useState, useEffect} from "react";
import AuthService from '../../service/authentication/AuthService'
import BacklogService from "../../service/backlog/BacklogService";
import "../../Style/Backlog.css";
import { toast } from 'react-toastify';

const Backlog = () => {
  const currentUser = AuthService.getCurrentUser();
  const currentProject = 'Project One';

  const[title, setTitle] = useState('');
  const[projectName, setProjectName] = useState('');
  const[assignee, setAssignee] = useState('');
  const[sprint, setSprint] = useState('');
  const[storyPoints, setStoryPoints] = useState('');
  const[description, setDescription] = useState('');
  const[backlogs, setBacklogs] = useState([]);
  const[backlogError, setBacklogError] = useState('');

  useEffect(() => {
    BacklogService.getBacklogByProject(currentProject)
    .then(response => {
      setBacklogs(response.data)
    })
    .catch(err => {
      console.log(err)
      setBacklogError('Unable to fetch backlog list at the moment')
    })
  },[])

  const addBacklogItem = e => {
    e.preventDefault();
    const newBacklogItem = {
      title,
      description,
      projectName,
      sprint: parseInt(sprint),
      createdBy: currentUser.email,
      assignee,
      status: 'TO_DO',
      createdAt: new Date(),
      storyPoints: parseInt(storyPoints)
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
      setProjectName('')
      setAssignee('')
      setSprint('')
      setStoryPoints('')
      setDescription('')
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

  return(
    <div className="backlog">
      <div className="sub_header px-4">
        <h3>Backlog</h3>
        <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
      </div>

      <div className="container pt-2">
        <div className="row">
          <div className="col-md-7 col-sm-12">
            <form className="backlog_left" onSubmit={addBacklogItem}>
              <div >
                {/* 1st row */}
                <div className="row">
                  <div className="col-md-6">
                      <label for="mail" className="form-label">Title *</label>
                      <div className="input-group">
                      <input type="text" className="form-control" id="title" placeholder="Enter the Title" onChange={(e) => setTitle(e.target.value)} required/>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <label for="mail" className="form-label">Project *</label>
                    <div className="input-group">
                        <select className="form-select border-secondary" id="inputGroupSelect01" onChange={(e) => setProjectName(e.target.value)} required>
                            <option value="" selected hidden>Select Project</option>
                            <option value="Project One">Project 1</option>
                            <option value="Project Two">Project 2</option>
                            <option value="Project Three">Project 3</option>
                        </select>
                    </div>
                  </div>
                </div>
                {/* 2nd row */}
                <div className="row"> 
                  <div className="col-md-4">
                      <label for="assignee" className="form-label">Assignee </label>
                      <input type="text" className="form-control" id="assignee" placeholder="Enter assignee name" onChange={(e) => setAssignee(e.target.value)}/>
                  </div>
                  <div className="col-md-4">
                      <label for="sprint" className="form-label">Sprint *</label>
                      <input type="text" className="form-control" id="sprint" placeholder="Enter sprint" onChange={(e) => setSprint(e.target.value)} required/>
                  </div>
                  <div className="col-md-4">
                    <label for="storyPoints" className="form-label">Story Points</label>
                    <input type="number" className="form-control" id="storyPoints" placeholder="Enter story points" onChange={(e) => setStoryPoints(e.target.value)} required/>
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
          
          <div className="col-md-5 col-sm-12">
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
                              <p>{backlog.title}</p>
                            </div>
                            <div className="col-md-2" id={backlog_color_id}>
                              <p>{backlog_state}</p>
                            </div>
                            <div className="col-md-1" id="backlog-icon">
                              <button className="btn"><i className="bi bi-pencil-square"></i></button>
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
    </div>
  );
};

export default Backlog;

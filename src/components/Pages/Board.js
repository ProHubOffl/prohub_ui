import React, {useState, useEffect} from "react";
import "../../Style/Board.css";
import BacklogService from "../../service/backlog/BacklogService";
import AuthService from "../../service/authentication/AuthService";
import ProjectUserService from "../../service/user/ProjectUserService";

const Board = () => {
  const currentProject = localStorage.getItem("project") === null ? "" : AuthService.getCurrentProject().projectName
  // console.log(AuthService.getCurrentProject().projectName)
  const[backlogs, setBacklogs] = useState([]);
  const[backlogError, setBacklogError] = useState('');
  const email = AuthService.getCurrentUser().email

  useEffect(() => {
    if(localStorage.getItem("project") === null)
      {    
        ProjectUserService.getProjectsByUser(email)
        .then(res => {
            console.log(res.data[0])
            localStorage.setItem("project", JSON.stringify(res.data[0]));
            // setCurrentProject(res.data[0].projectName)
            BacklogService.getBacklogByProject(res.data[0].projectName)
            .then(response => {
              setBacklogs(response.data)
            })
            .catch(err => {
              setBacklogError('Unable to fetch the backlog board at the moment')
            })
        })
        .catch(err => {console.log(err)})
       } else {
        BacklogService.getBacklogByProject(currentProject)
        .then(response => {
          setBacklogs(response.data)
        })
        .catch(err => {
          setBacklogError('Unable to fetch the backlog board at the moment')
        })
       }
  },[])

  return (
    <div>
      <div className="sub_header px-4">
          <h3>Board</h3>
          <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
        </div>
      <div className="container" id="canbanboard">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="board">
              <div className="board-header">
                <h4>To Do</h4>
              </div>
              <div className="board-body">
                {
                  backlogError.length > 0 ?
                  <div id="backlog-error">{backlogError}</div>
                  :
                  backlogs.filter(backlog => backlog.status === 'TO_DO').map(backlog => {
                    return (
                      <div className="board-card" id="todo">
                        <div id="card-heading">
                          <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}</span>
                          <button className="btn"><a href={`Backlog/${backlog.backlogId}`}><i className="bi bi-pencil-square"></i></a></button>
                        </div>
                        <div id="card-body">
                          <p>{backlog.title}</p>
                        </div>
                      </div>
                    )
                  })     
                }
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>In Progress</h4>
              </div>
              <div className="board-body">
                  {
                    backlogError.length > 0 ?
                    <div id="backlog-error">{backlogError}</div>
                    :
                    backlogs.filter(backlog => backlog.status === 'IN_PROGRESS').map(backlog => {
                      return (
                        <div className="board-card" id="in-progress">
                          <div id="card-heading">
                            <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}</span>
                            <button className="btn"><a href={`Backlog/${backlog.backlogId}`}><i className="bi bi-pencil-square"></i></a></button>
                          </div>
                          <div id="card-body">
                            <p>{backlog.title}</p>
                          </div>
                        </div>
                      )
                    })     
                  }
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>Finished</h4>
              </div>
              <div className="board-body">
                  {
                    backlogError.length > 0 ?
                    <div id="backlog-error">{backlogError}</div>
                    :
                    backlogs.filter(backlog => backlog.status === 'FINISHED').map(backlog => {
                      return (
                        <div className="board-card" id="done">
                          <div id="card-heading">
                            <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}</span>
                            <button className="btn"><a href={`Backlog/${backlog.backlogId}`}><i className="bi bi-pencil-square"></i></a></button>
                          </div>
                          <div id="card-body">
                            <p>{backlog.title}</p>
                          </div>
                        </div>
                      )
                    })     
                  }
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>Approved</h4>
              </div>
              <div className="board-body">
                {
                  backlogError.length > 0 ?
                  <div id="backlog-error">{backlogError}</div>
                  :
                  backlogs.filter(backlog => backlog.status === 'APPROVED').map(backlog => {
                    return (
                      <div className="board-card" id="approved">
                        <div id="card-heading">
                          <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}</span>
                          <button className="btn"><a href={`Backlog/${backlog.backlogId}`}><i className="bi bi-pencil-square"></i></a></button>
                        </div>
                        <div id="card-body">
                          <p>{backlog.title}</p>
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

export default Board;
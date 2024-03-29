import React, {useState, useEffect} from "react";
import "../../Style/Board.css";
import BacklogService from "../../service/backlog/BacklogService";
import AuthService from "../../service/authentication/AuthService";
import Unknown_image from "../../images/Unknown.png"
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const Board = () => {
  const currentProject = AuthService.getCurrentProject().projectName
  const currentUser = AuthService.getCurrentUser().email;
  const[backlogs, setBacklogs] = useState([]);
  const[backlogError, setBacklogError] = useState('');
  const token = AuthService.getCurrentUser().jwtToken
  const decode = JSON.parse(atob(token.split('.')[1]));

  useEffect(() => {
    if (decode.exp * 1000 < new Date().getTime()) {
      setTimeout(() => { AuthService.logout()  }, 2500);
    }
    BacklogService.getBacklogByProject(currentProject)
    .then(response => {
      setBacklogs(response.data)
    })
    .catch(err => {
      setBacklogError('Unable to fetch the backlog board at the moment')
    })
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
                      <div className="board-card" id="todo" key={backlog.backlogId}>
                        <div id="card-heading">
                          <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}
                          {
                            backlog.assignee == currentUser
                            ?
                          <span className="mytask">
                            <Tooltip title="My Task" placement="right" arrow="true">
                              <img width="6%" heigh="6%" src={Unknown_image} alt="Profile"/>
                            </Tooltip>
                          </span>
                            :
                            ""
                          }
                          </span>
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
                        <div className="board-card" id="in-progress" key={backlog.backlogId}>
                          <div id="card-heading">
                            <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}
                              {
                              backlog.assignee == currentUser
                              ?
                            <span className="mytask">
                              <Tooltip title="My Task" placement="right" arrow="true">
                                <img width="6%" src={Unknown_image} alt="Profile"/>
                              </Tooltip>
                            </span>
                              :
                              ""
                              }
                            </span>
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
                        <div className="board-card" id="done" key={backlog.backlogId}>
                          <div id="card-heading">
                            <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}
                              {
                              backlog.assignee == currentUser
                              ?
                            <span className="mytask">
                              <Tooltip title="My Task" placement="right" arrow="true">
                                <img width="6%" src={Unknown_image} alt="Profile"/>
                              </Tooltip>
                            </span>
                              :
                              ""
                              }
                            </span>
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
                      <div className="board-card" id="approved" key={backlog.backlogId}>
                        <div id="card-heading">
                          <span style={{color:'white',fontStyle:'bold',fontWeight:'500'}}>Sprint - {backlog.sprint}
                          {
                            backlog.assignee == currentUser
                            ?
                          <span className="mytask">
                            <Tooltip title="My Task" placement="right" arrow="true">
                              <img width="6%" src={Unknown_image} alt="Profile"/>
                            </Tooltip>
                          </span>
                            :
                            ""
                          }
                          </span>
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
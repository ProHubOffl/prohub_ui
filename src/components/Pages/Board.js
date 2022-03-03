import React, {useState, useEffect} from "react";
import "../../Style/Board.css";
import BacklogService from "../../service/backlog/BacklogService";

const Board = () => {
  const currentProject = 'Project One';

  const[backlogs, setBacklogs] = useState([]);
  const[backlogError, setBacklogError] = useState('');

  useEffect(() => {
    BacklogService.getBacklogByProject(currentProject)
    .then(response => {
      setBacklogs(response.data)
    })
    .catch(err => {
      console.log(err)
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
          <div className="col-md-3 col-sm-6">
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
                          <button className="btn"><i className="bi bi-pencil-square"></i></button>
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
                            <button className="btn"><i className="bi bi-pencil-square"></i></button>
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
                            <button className="btn"><i className="bi bi-pencil-square"></i></button>
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
                          <button className="btn"><i className="bi bi-pencil-square"></i></button>
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

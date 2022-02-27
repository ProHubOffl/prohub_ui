
import React from "react";
import "../../Style/Backlog.css"

const Backlog = () => {
  return(
    <div className="backlog">
      <div className="sub_header px-4">
        <h3>Backlog</h3>
        <p className="fw-bold">Project / <span className="fw-bolder">[Project Name]</span></p>
      </div>

      <div className="container pt-2">
        <div className="row">
          <div className="col-md-7 col-sm-12">
            <form className="backlog_left">
              <div >
                {/* 1st row */}
                <div className="row">
                  <div className="col-md-6">
                      <label for="mail" className="form-label">Title *</label>
                      <div className="input-group">
                      <input type="text" className="form-control" id="title" placeholder="Enter the Title" required/>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <label for="mail" className="form-label">Project *</label>
                    <div className="input-group">
                        <select className="form-select border-secondary" id="inputGroupSelect01" required>
                            <option value="" selected hidden>Select Project</option>
                            <option value="1">Project 1</option>
                            <option value="2">Project 2</option>
                            <option value="3">Project 3</option>
                        </select>
                    </div>
                  </div>
                </div>
                {/* 2nd row */}
                <div className="row"> 
                  <div className="col-md-4">
                      <label for="teamName" className="form-label">Assignee </label>
                      <input type="text" className="form-control" id="teamName" placeholder="Enter your team name"/>
                  </div>
                  <div className="col-md-4">
                      <label for="projectName" className="form-label">Sprint *</label>
                      <input type="text" className="form-control" id="projectName" placeholder="Enter the project name" required/>
                  </div>
                  <div className="col-md-4">
                    <label for="storyPoints" className="form-label">Story Points</label>
                    <input type="number" className="form-control" id="storyPoints" placeholder="Enter story points" required/>
                  </div>
                </div>
                {/* 3rd row */}
                <div className="row">
                <div className="col-md-12">
                    <label for="description" className="form-label">Description *</label> <br></br>
                    <textarea width="100%" rows="10" className="form-control border-secondary" id="description" placeholder="Enter description" required>
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
                <div className="backlog-card fw-bold">
                  <div className="row">
                    <div className="col-md-9">
                      <p >
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>
                    </div>
                    <div className="col-md-2" id="backlog-label">
                      <p>In Progress</p>
                    </div>
                    <div className="col-md-1" id="backlog-icon">
                      <button className="btn"><i className="bi bi-pencil-square"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backlog;

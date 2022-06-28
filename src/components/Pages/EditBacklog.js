import React, { useState } from 'react';
import "../../Style/Backlog.css";

function EditBacklog() {
    return (
        <div className="project-form">
            <div className="modal-dialog modal-dialog modal-lg">
                <form>
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
                                  <input type="text" className="form-control" id="title" placeholder="Enter the Title" required/>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                <label for="mail" className="form-label">Project *</label>
                                <div className="input-group">
                                    <select className="form-select border-secondary" id="inputGroupSelect01" required>
                                        <option value="" selected hidden>Select Project</option>
                                        <option value="Project One">Project 1</option>
                                        <option value="Project Two">Project 2</option>
                                        <option value="Project Three">Project 3</option>
                                    </select>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label for="mail" className="form-label">Project Type *</label>
                                <div className="input-group">
                                    <select className="form-select border-secondary" id="inputGroupSelect02" required>
                                        <option value="" selected hidden>Select Type</option>
                                        <option value="Type One">Bug</option>
                                        <option value="Type Two">Story</option>
                                        <option value="Type Three">Improvement</option>
                                    </select>
                                </div>
                              </div>
                            </div>
                            {/* 2nd row */}
                            <div className="row"> 
                              <div className="col-md-4">
                                  <label for="assignee" className="form-label">Assignee </label>
                                  <input type="text" className="form-control" id="assignee" placeholder="Enter assignee name"/>
                              </div>
                              <div className="col-md-4">
                                  <label for="sprint" className="form-label">Sprint *</label>
                                  <input type="text" className="form-control" id="sprint" placeholder="Enter sprint" required/>
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
                                <textarea width="100%" rows="9" className="form-control border-secondary" id="description" placeholder="Enter description" required>
                                </textarea>
                            </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBacklog;
import React from 'react';
import "../../Style/Project.css";

function CreateProject() {
    return (
        <div className="project-form">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticBackdropLabel">Create New Project</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="teamName" className="form-label">Team Name *</label>
                                        <input type="text" className="form-control" id="teamName" placeholder="Enter your team name" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="projectName" className="form-label">Project Name *</label>
                                        <input type="text" className="form-control" id="projectName" placeholder="Enter the project name" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label for="description" className="form-label">Description *</label>
                                        <textarea className="form-control border-secondary" id="description" placeholder="Enter the Description" required></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="startDate" className="form-label">Start Date *</label>
                                        <input type="date" className="form-control" id="teamName" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="endDate" className="form-label">End Date *</label>
                                        <input type="date" className="form-control" id="endDate" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label for="projectType" className="form-label">Project Type *</label>
                                        <input type="text" className="form-control" id="projectType" placeholder="Enter project type" required/>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="storyPoints" className="form-label">Story Points</label>
                                        <input type="number" className="form-control" id="storyPoints" placeholder="Enter story points" />
                                    </div>
                                    <div className="col-md-4">
                                        <label for="totalPoints" className="form-label">Total Points</label>
                                        <input type="number" className="form-control" id="totalPoints" placeholder="Enter total points" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" id="btn-close" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary fw-bolder" id="btn-create">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default CreateProject;
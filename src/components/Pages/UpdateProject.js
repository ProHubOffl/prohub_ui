import React from 'react';
import "../../Style/Project.css";
import CreateUser from "./AddUserRole";
import UpdateUser from "./UpdateUserRole";

function UpdateProject() {
    return (
        <div className="project-form">
            <button type="button" className="btn btn-primary fw-bolder" id="btn-update-project" data-bs-toggle="modal" data-bs-target="#UpdateProject">
                Update Project
            </button>

            <div className="modal fade" id="UpdateProject" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticBackdropLabel">Update Project</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-6">
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
                                                <label for="totalSprint" className="form-label">Total Sprint</label>
                                                <input type="number" className="form-control" id="totalSprint" placeholder="Enter total sprint" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                    <button type="button" className="btn btn-primary fw-bolder" id="btn-CreateUser" data-bs-toggle="modal" data-bs-target="#CreateUser">
                                        Add User Role
                                    </button>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Operation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>srjey3@gmail.com</td>
                                                    <td>Developer</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger mx-1" onclick="" data-bs-toggle="modal" data-bs-target="#DeleteUser" ><i className="bi bi-trash-fill"></i></button>
                                                        <button type="button" className="btn btn-secondary" onclick="" data-bs-toggle="modal" data-bs-target="#UpdateUser"><i className="bi bi-pencil-square"></i></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

            <div className="modal fade" id="CreateUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <CreateUser />
            </div>
            
            <div className="modal fade" id="UpdateUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <UpdateUser />
            </div>
            
        </div>
    );
}

export default UpdateProject;
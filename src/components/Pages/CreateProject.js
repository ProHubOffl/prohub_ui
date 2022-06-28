import React,{useState} from 'react';
import ProjectService from '../../service/project/ProjectService';
import "../../Style/Project.css";
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../../service/authentication/AuthService';
import ProjectUserService from '../../service/user/ProjectUserService';

function CreateProject() {
    const[teamName,SetTeamName]=useState('');
    const[projectName,SetProjectName]=useState('');
    const[projectDescription,SetProjectDescription]=useState('');
    const[startDate,SetStartDate]=useState('');
    const[endDate,SetEndDate]=useState('');
    const[projectType,SetProjectType]=useState('');
    const[storyPoints,SetStoryPoints]=useState('');
    const[totalSprints,SetTotalSprints]=useState('');
    const email = AuthService.getCurrentUser().email
    const role = "Developer"

    const createProjecthandler = (e) => {
        e.preventDefault();
        const project = {
            teamName,
            projectName,
            projectDescription,
            startDate,
            endDate,
            projectType,
            storyPoints,
            totalSprints
        }
        ProjectService.createProject(project)
        const projectUserRole = {
            projectName,
            email,
            role
        }
        ProjectUserService.addProjectUserRole(projectUserRole)
        .then(response => {
            toast.success('Project Created Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {window.location.reload()}, 2000);
            SetEndDate('')
            SetStartDate('')
            SetProjectName('')
            SetProjectType('')
            SetProjectDescription('')
            SetTotalSprints('')
            SetStoryPoints('')
            SetTeamName('')
        })
        .catch(err => {
            console.log(err)
            toast.error('Unable to proceed your request', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    return (
        <div className="project-form">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <form onSubmit={createProjecthandler}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticBackdropLabel">Create New Project</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="teamName" className="form-label">Team Name *</label>
                                        <input type="text" className="form-control" id="teamName" placeholder="Enter your team name" onChange={(e) => SetTeamName(e.target.value)} value={teamName} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="projectName" className="form-label">Project Name *</label>
                                        <input type="text" className="form-control" id="projectName" placeholder="Enter the project name" onChange={(e) => SetProjectName(e.target.value)} value={projectName} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label for="description" className="form-label">Description *</label>
                                        <textarea className="form-control border-secondary" id="description" placeholder="Enter the Description" onChange={(e) => SetProjectDescription(e.target.value)} value={projectDescription} required></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="startDate" className="form-label">Start Date *</label>
                                        <input type="date" className="form-control" id="teamName" onChange={(e) => SetStartDate(e.target.value)} value={startDate} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="endDate" className="form-label">End Date *</label>
                                        <input type="date" className="form-control" id="endDate" onChange={(e) => SetEndDate(e.target.value)} value={endDate} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label for="projectType" className="form-label">Project Type *</label>
                                        <input type="text" className="form-control" id="projectType" placeholder="Enter project type" onChange={(e) => SetProjectType(e.target.value)} value={projectType} required/>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="storyPoints" className="form-label">Story Points *</label>
                                        <input type="number" className="form-control" id="storyPoints" placeholder="Enter story points" onChange={(e) => SetStoryPoints(e.target.value)} value={storyPoints} required/>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="totalPoints" className="form-label">Total Sprints *</label>
                                        <input type="number" className="form-control" id="totalPoints" placeholder="Enter total points" onChange={(e) => SetTotalSprints(e.target.value)} value={totalSprints} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create">Create</button>
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

export default CreateProject;
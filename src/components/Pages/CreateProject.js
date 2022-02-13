import React, { useState } from "react";
import "../../Style/Project.css";
import newProjectService from "../../service/newproject/NewProjectService";

function CreateProject() {
  const [teamName, setTeamName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectType, setProjectType] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [totalSprints, setTotalSprints] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    newProjectService
      .createNewProject(
        teamName,
        projectName,
        projectDescription,
        startDate,
        endDate,
        projectType,
        storyPoints,
        totalSprints
      )
      .then((response) => {
        console.log(response);
        setTeamName("");
        setProjectName("");
        setprojectDescription("");
        setStartDate("");
        setEndDate("");
        setProjectType("");
        setStoryPoints("");
        setTotalSprints("");
        window.location.replace("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="project-form">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fw-bolder" id="staticBackdropLabel">
                Create New Project
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <label for="teamName" className="form-label">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="projectName" className="form-label">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    placeholder="Enter the project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label for="projectDescription" className="form-label">
                    projectDescription *
                  </label>
                  <textarea
                    className="form-control border-secondary"
                    id="projectDescription"
                    placeholder="Enter the projectDescription"
                    value={projectDescription}
                    onChange={(e) => setprojectDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label for="startDate" className="form-label">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="endDate" className="form-label">
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label for="projectType" className="form-label">
                    Project Type *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectType"
                    placeholder="Enter project type"
                    required
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label for="storyPoints" className="form-label">
                    Story Points
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="storyPoints"
                    placeholder="Enter story points"
                    value={storyPoints}
                    onChange={(e) => setStoryPoints(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label for="totalSprints" className="form-label">
                    Total Sprints
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalSprints"
                    placeholder="Enter total sprints"
                    value={totalSprints}
                    onChange={(e) => setTotalSprints(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fw-bolder"
                id="btn-close"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary fw-bolder"
                id="btn-create"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;

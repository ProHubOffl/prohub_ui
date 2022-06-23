import React from 'react';
import AuthService from '../../service/authentication/AuthService';
import "../../Style/Documents.css";

function CreateDocument() {
    const currentProject = 'Project One';
    const first_name=AuthService.getCurrentUser().firstName.slice(0,10)
    const last_name=AuthService.getCurrentUser().lastName.slice(0,10)

    return (
        <div className="document-form">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticdocdropLabel">Add New Document</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-7">
                                        <label for="teamName" className="form-label">Title of the Document *</label>
                                        <input type="text" className="form-control" id="teamName" placeholder="Enter your team name" required/>
                                    </div>
                                    <div className="col-md-5">
                                        <label for="projectName" className="form-label">Project Name</label>
                                        <input type="text" className="form-control" id="projectName" value={currentProject} readOnly/>
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
                                        <label for="file" className="form-label">Upload your File *</label>
                                        <input type="file" className="form-control" id="file" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="author" className="form-label">Author</label>
                                        <input type="text" className="form-control" id="author" value={first_name+" "+last_name} readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" id="btn-document-close" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary fw-bolder" id="btn-document-create">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default CreateDocument;
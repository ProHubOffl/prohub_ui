import React from 'react';
import "../../Style/Project.css";

function AddAnnouncement() {
    return (
        <div className="project-form">
            <div className="modal-dialog modal-dialog">
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bolder" id="CreateUser">Add Announcement</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="mail" className="form-label">Title *</label>
                                    <input type="text" className="form-control" id="mail" placeholder="Enter Announcement Title" required/>
                                </div>
                            </div>
                            
                            <div className="row">
                                <label for="description" className="form-label">Description *</label>
                                <div class="input-group mb-3">
                                    <textarea rows="5" className="form-control border-secondary" id="description" placeholder="Enter the Description" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAnnouncement;
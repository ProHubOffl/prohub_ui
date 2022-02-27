import React from 'react';
import "../../Style/Project.css";

function UpdateUserRole() {
    return (
        <div>
            <div className="project-form">
            <div className="modal-dialog modal-dialog">
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bolder" id="UpdateUser">Update User Role</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="mail" className="form-label">Email Address *</label>
                                    <input type="text" className="form-control" id="mail" placeholder="Enter E-mail Address" required/>
                                </div>
                            </div>
                            <div className="row">
                                <label for="mail" className="form-label">Role *</label>
                                <div class="input-group mb-3">
                                    <select class="form-select" id="inputGroupSelect01">
                                        <option selected value="1">Product Owner</option>
                                        <option value="2">Scrum Master</option>
                                        <option value="3">Developer</option>
                                    </select>
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
        </div>
    );
}

export default UpdateUserRole;
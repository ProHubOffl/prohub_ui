import React, { useEffect, useState } from 'react';
import "../../Style/Project.css";
import ProjectUserService from "../../service/user/ProjectUserService"
import { toast, ToastContainer } from 'react-toastify';

function UpdateUserRole(props) {

    const projectName = props.user.projectName;
    const email = props.user.email;
    const role = props.user.role;

    const[newRole, setNewRole] = useState('');

    const updateProjectUserRole = (e) => {
        e.preventDefault();
        const modifiedProjectUserRole = {
            projectName,
            email,
            role: newRole
        }
        ProjectUserService.updateProjectUserRole(projectName, modifiedProjectUserRole)
        .then(response => {
            toast.success('User Role Updated Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload()
            setNewRole('')
            document.getElementById("update-form").style.visibility = "visible"
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
        <div>
            <div className="project-form">
            <div className="modal-dialog modal-dialog">
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bolder" id="UpdateUserRole">Update User Role</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="mail" className="form-label">Email Address *</label>
                                    <input type="email" value={email} className="form-control" id="mail" placeholder="Enter E-mail Address" readOnly/>
                                </div>
                            </div>
                            <div className="row">
                                <label for="mail" className="form-label">Role *</label>
                                <div class="input-group mb-3">
                                    <select class="form-select" id="inputGroupSelect01" onChange={(e) => setNewRole(e.target.value)}>
                                        <option value="Product Owner">Product Owner</option>
                                        <option value="Scrum Master">Scrum Master</option>
                                        <option value="Developer">Developer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create" onClick={updateProjectUserRole}>Update</button>
                        </div>
                    </div>
                </form>
            </div>
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

export default UpdateUserRole;
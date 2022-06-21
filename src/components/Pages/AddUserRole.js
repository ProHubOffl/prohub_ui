import React, { useState } from 'react';
import "../../Style/Project.css";
import ProjectUserService from "../../service/user/ProjectUserService"
import { toast } from 'react-toastify';

function AddUserRole() {
    const projectName = "Project One";

    const[email, setEmail] = useState('')
    const[role, setRole] = useState('Product Owner')

    const addUserRole = (e) => {
        e.preventDefault();
        const projectUserRole = {
            projectName,
            email,
            role
        }
        ProjectUserService.addProjectUserRole(projectUserRole)
        .then(response => {
            window.location.replace("/")
            setEmail('')
            setRole('')
            toast.success('User Role Added Successfully', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            alert("User Role Added Successfully")
        })
        .catch(err => {
            console.log(err)
            toast.error('Unable to proceed your request', {
                position: "top-center",
                autoClose: 2500,
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
            <div className="modal-dialog modal-dialog">
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bolder" id="CreateUser">Add User Role</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="mail" className="form-label">Email Address *</label>
                                    <input type="text" className="form-control" id="mail" placeholder="Enter E-mail Address" onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            
                            <div className="row">
                                <label for="mail" className="form-label">Role *</label>
                                <div class="input-group mb-3">
                                    <select class="form-select" id="inputGroupSelect01" onChange={(e) => setRole(e.target.value)}>
                                        <option selected value="Product Owner">Product Owner</option>
                                        <option value="Scrum Master">Scrum Master</option>
                                        <option value="Developer">Developer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create" onClick={addUserRole}>Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUserRole;
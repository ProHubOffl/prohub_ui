import React,{useState,useEffect} from 'react';
import "../../Style/Project.css";
import CreateUser from "./AddUserRole";
import UpdateUser from "./UpdateUserRole";
import ProjectUserService from "../../service/user/ProjectUserService"
import {Animated} from "react-animated-css";
import { toast, ToastContainer } from 'react-toastify';

function UpdateProject() {

    const projectName = "Project One";

    const[users, setUsers] = useState([]);
    const[userError, setUserError] = useState('');
    const[selectedUser, setSelectedUser] = useState({})

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }

    const showpopup =()=>{
        setShow(true);
    }

    const selectUserRole = (user) => {
        setSelectedUser(user)
    }

    const deleteUserRole = (email) => {
        ProjectUserService.deleteProjectUserRole(email, projectName)
        .then(response => {
            document.getElementById("update-form").style.visibility = "hidden"
            toast.success('User Role Removed Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload()
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

    useEffect(() => {
        ProjectUserService.getProjectUserRoles(projectName)
        .then(response => {
            setUsers(response.data)
            if(response.data.length < 0) {
                setUserError("No users Have been assigned to this project")
            }
        })
        .catch(err => {
            setUserError("Unable to fetch the project user roles at the moment")
        })
    },[])

    return (
        <>
            <button type="button"  id="btn-update-project" onClick={showpopup}>
                Update Project
            </button>
        {
        show
        ?
        <Animated animationIn="slideInDown" animationOut="slideOutDown" animationInDuration={4000} animationOutDuration={4000} isVisible={show}>
            <div className="project-form" id="update-form">
                <div className="modal-xl modal-box">                   
                    <form>
                        <div className="modal-content" id="modal-content-box">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticBackdropLabel">Update Project</h3>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
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
                                    <button type="button" className="btn btn-primary fw-bolder" id="btn-Create" data-bs-toggle="modal" data-bs-target="#CreateUser">
                                        Add User Role
                                    </button>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Operation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userError.length > 0 ? 
                                                    <tr>
                                                        <td>{userError}</td>
                                                    </tr> :
                                                    users.map(user => {
                                                        return(
                                                            <tr key={user.email}>
                                                                <td>{user.email}</td>
                                                                <td>{user.role}</td>
                                                                <td>
                                                                    <button type="button" className="btn btn-danger mx-1" onClick={() => deleteUserRole(user.email)} ><i className="bi bi-trash-fill"></i></button>
                                                                    <button type="button" className="btn btn-secondary" onClick={() => selectUserRole(user)} data-bs-toggle="modal" data-bs-target="#UpdateUser"><i className="bi bi-pencil-square"></i></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" onClick={handleClose}>Cancel</button>
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
                <UpdateUser user={selectedUser} />
            </div>           
        
        </Animated>
        :
        ""
        }
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
        </>
    );
}

export default UpdateProject;
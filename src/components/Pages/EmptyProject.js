import React from 'react'
import CreateProject from "../Pages/CreateProject";
import AuthService from '../../service/authentication/AuthService';

export default function EmptyProject() {
    const handleLogout = (e) => {
        e.preventDefault()
        AuthService.logout()
    }
    return (
        <div>
            <h3>Has No Projects</h3>
            <button onClick={handleLogout}>Logout</button>
            <button type="button" className="btn btn-primary fw-bolder" id="btn-CreateProject" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Create Project
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <CreateProject />
            </div>
        </div>
    )
}

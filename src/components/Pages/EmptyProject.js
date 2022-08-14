import React, { useEffect } from 'react'
import CreateProject from "../Pages/CreateProject";
import AuthService from '../../service/authentication/AuthService';
import logo from '../../images/prohub.png'

export default function EmptyProject() {
    const currentUser = AuthService.getCurrentUser()

    const handleLogout = (e) => {
        e.preventDefault()
        AuthService.logout()
    }

    useEffect(() => {},[3000])
    return (
        <div style={{marginTop:"30px",alignContent:'center',alignItems:'center',textAlign:'center'}}>
            <img src={logo} alt='logo' height='200' width='200'/>
            <h3>Welcome to Prohub {currentUser.firstName}!</h3>
            <h5>You haven't been assigned to a project yet</h5>
            <div>
                <button type="button" className="btn btn-primary fw-bolder" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{width:'15%',background:'linear-gradient(rgb(0, 56, 71) 0%, rgba(0, 56, 71, 0.75) 100%)'}}>
                    Create Project
                </button>
                <button type='button' style={{width:'15%',marginLeft:'5px'}} className="btn btn-danger fw-bolder" onClick={handleLogout}>Logout</button>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <CreateProject />
            </div>
        </div>
    )
}

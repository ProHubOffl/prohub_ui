import React, { useState } from 'react'
import "../../Style/Signin.css"
import AuthService from '../../service/authentication/AuthService';
import { ToastContainer, toast } from 'react-toastify';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        document.getElementById("btn-signin").disabled = true;
        AuthService.forgotPassword(email)
        .then(response => {
            document.getElementById("btn-signin").disabled = false;
            if(response.data == 200) {
                toast.success('You will receive your temporary password to the given email', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });        
                setTimeout(() => { window.location.replace('/authenticate') }, 2500);
                setEmail('');
            } else {
                toast.error('Unable to proceed your request. Please provide a valid email', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }            
        })
        .catch(err => {
            document.getElementById("btn-signin").disabled = false;
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
        <div className='container col-4 mt-3'>
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
            <div className='row'>
                <h4><span id="h2-c1">Forgot Password ?</span></h4>
                <p>We will sent you a temporary password to your email address. Please change your temporary password once you signed in.</p>
                <div className='row form-group'>
                    <input 
                        type="email"
                        className="form-control"  
                        placeholder="Email Address"
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required
                    /><br></br>
                    <button id="btn-signin" className="btn" onClick={handleSubmit}>
                        <p className='mt-1 mb-0'>Request Temporary Password</p>
                    </button>
                </div>
            </div>
            
        </div>
    )
}

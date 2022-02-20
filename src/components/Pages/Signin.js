import React,{useState} from 'react';
import logo from "../../images/prohub.jpg";
import "../../Style/Signin.css"
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authService from '../../service/authentication/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[errorMsg,setErrorMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        authService.login(email,password)
        .then(response => {
            console.log(response)
            window.location.replace('/Board')
            setEmail('')
            setPassword('')     
        })
        .catch(err =>{ 
            console.log(err)
            setErrorMsg("Invalid credentials");
        })   
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-md-auto bg-container mt-4">
                    <div className="col-md-9 mt-60 mx-md-auto">
                        <div className="auth-box1 bg-myColor">
                            <div className="row no-gutters align-items-center mx-auto">
    
                                <div className="col-md-5 ">
                                    <div className=" px-3 mb-3 mx-auto">
                                        <img src={logo} alt="prohub" id="img1"/>
                                    </div>

                                    <div className="text-white mb-4 text-center">
                                        <h3>I don't have an account.</h3>
                                        <h5>It's easy to create, <br/> Just sign-up with your email.</h5>
                                    </div>
                                    <div className="col-12 mt-30 text-center">
                                        
                                        <NavLink to="/register" exact>
                                            <button type="button" id="btn-signup" className="btn">
                                                Sign up
                                            </button>
                                        </NavLink>

                                    </div>
                                </div>
    
                                <div className="col-md-7">
                                    <div className="form-wrap1 bg-white">
                                        <h2 className="pb-1 text-center fw-bolder mt-2"><span id="h2-c1">Sign in</span> <span id="h2-c2">to ProHub</span></h2>
                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="row form-group">
                                                <div className="col-12">
                                                <input 
                                                        type="email"
                                                        className="form-control"  
                                                        placeholder="Email Address"
                                                        value={email}
                                                        onChange = {(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    <input 
                                                        type="password" 
                                                        id="password" 
                                                        className="form-control" 
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange = {(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <div>
                                                        <h6>{errorMsg}</h6>
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-30 text-center">
                                                        <button type="submit" id="btn-signin" className="btn">
                                                            Sign in
                                                        </button>
                                                </div>
                                                <div>
                                                    <h6 className="text-center mt-3"><span className="text-muted">Forgot </span><Link to="#" id="h6-forgot">Password</Link></h6>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signin;
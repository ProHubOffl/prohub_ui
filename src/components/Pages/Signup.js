import React,{useState} from 'react';
import "../../Style/Signup.css";
import logo from "../../images/prohub.jpg";
import { NavLink } from 'react-router-dom';
import authService from '../../service/authentication/AuthService';


function Signup() {
    const currentUser = authService.getCurrentUser()
    if(currentUser != null){
        window.location.replace('/loading')
    }
    const[firstName,setFirstName] = useState('')
    const[lastName,setLastName] = useState('')
    const[designation,setDesignation] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[passwordErrorMsg,setpasswordErrorMsg] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password != confirmPassword) {
            setpasswordErrorMsg("Passwords Not Matching");
        } else {
            authService.register(firstName,lastName,email,designation,password)
        .then(response => {
            console.log(response)
            alert("Registered successfully")
            window.location.replace('/authenticate')
        })
        .catch(err =>{ 
            console.log(err)
            setpasswordErrorMsg("Unable to Signup");
        })
        setFirstName('')
        setLastName('')
        setDesignation('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setpasswordErrorMsg('')
        }
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-md-auto bg-container">
                    <div className="col-md-9 mt-60 mx-md-auto">
                        <div className="auth-box bg-myColor">
                            <div className="row no-gutters align-items-center mx-auto">

                                <div className="col-md-5 ">
                                    <div className=" px-3 mb-3 mx-auto">
                                    <img src={logo} alt="prohub" id="img1"/>
                                    </div>

                                    <div className="text-white mb-4 text-center">
                                        <h4>Already have an account?</h4>
                                        <h5>It's easy to start, <br/> Just sign-in with your email</h5>
                                    </div>
                                    <div className="col-12 mt-30 text-center">
                                            <NavLink to="/authenticate">
                                                <button type="submit" id="signin" className="btn">
                                                    Sign in
                                                </button>
                                            </NavLink>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <div className="form-wrap bg-white">
                                        <h2 className="pb-3 text-center fw-bolder"><span id="h2-c1">Sign up</span> <span id="h2-c1">to ProHub</span></h2>
                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="row form-group">
                                                <div className="col-12">
                                                    <input 
                                                        type="text"
                                                        className="form-control" 
                                                        placeholder="First Name"
                                                        value={firstName}
                                                        onChange = {(e) => setFirstName(e.target.value)} 
                                                        required
                                                    />
                                                    <input 
                                                        type="text" id="lname" 
                                                        className="form-control"  
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange = {(e) => setLastName(e.target.value)} 
                                                        required
                                                    />
                                                    <input 
                                                        type="text"
                                                        className="form-control" 
                                                        placeholder="Designation"
                                                        value={designation}
                                                        onChange = {(e) => setDesignation(e.target.value)}
                                                        required
                                                    />
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
                                                    <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        placeholder="Confirm Password"
                                                        value={confirmPassword}
                                                        onChange = {(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                    <div>
                                                        <h6>{passwordErrorMsg}</h6>
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-30 text-center">
                                                    <button type="submit" id="signup" className="btn">
                                                        Sign up
                                                    </button>
                                                </div>
                                            </div>
                                        </form >
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

export default Signup;
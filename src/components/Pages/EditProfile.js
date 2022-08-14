import React,{useState} from "react";
import "../../Style/EditProfile.css"
import AuthService from "../../service/authentication/AuthService";
import ProfilePicture from "./ProfilePicture";
import PasswordStrengthMeter from '../Validators/PasswordStrengthMeter';
import zxcvbn from 'zxcvbn';
import "react-image-lightbox/style.css";
import UserService from "../../service/user/UserService";
import { ToastContainer, toast } from 'react-toastify';


function EditProfile(){
    const[password,setPassword] = useState('')
    const[passwordErrorMsg,setpasswordErrorMsg] = useState('')
    const[currentpassword,setcurrentpassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    const[firstName,setfirstName] = useState(AuthService.getCurrentUser().firstName)
    const[lastName,setlastName] = useState(AuthService.getCurrentUser().lastName)
    const[designation,setdesignation] = useState(AuthService.getCurrentUser().designation)
    const[disable,setdisable] = useState(false)
    const email = AuthService.getCurrentUser().email
    const isUpdatePassword = (password === '' && currentpassword === '' && confirmPassword==='');
    const isUpdatePersonalInfo = (firstName === AuthService.getCurrentUser().firstName && lastName === AuthService.getCurrentUser().lastName  && designation === AuthService.getCurrentUser().designation) ;

    const handle_InfoUpdateSubmit = async (e) => {
      e.preventDefault()
    setdisable(true)
    await UserService.updateUser(firstName,lastName,email,designation)
    .then(response => {
        console.log(response)
        toast.success('Personal Information Updated Successfully!', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });      
          
          var testObject = { 'firstName': firstName, 'lastName': lastName, 'email': email, 'designation': designation, 'jwtToken': AuthService.getCurrentUser().jwtToken };
          localStorage.setItem("user", JSON.stringify(testObject)); 
          setTimeout(() => { window.location.replace('/EditProfile')  }, 2500);
    })
    .catch(err =>{ 
        console.log(err)
        toast.error('Unable to update Info plz login again!!', {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });  
    })
  }

    const handleSubmit_ResetPassword = async (e) => {
        e.preventDefault()
        const testResult = zxcvbn(password);
        if(password.length<8){
            setpasswordErrorMsg("Password Length is Very Short");
        }
        else if(testResult.score === 0){
            setpasswordErrorMsg("Your Password is very Weak");
        }
        else if(testResult.score === 1){
            setpasswordErrorMsg("Your Password is Weak");
        }
        else if(password === currentpassword) {
          setpasswordErrorMsg("New password can't be same as Current password");
        }
        else if(password !== confirmPassword) {
            setpasswordErrorMsg("New Passwords Not Matching");
        } else {
        setdisable(true)
         await UserService.updatePassword(password,currentpassword)
          .then(response => {
              console.log(response)
              if(response.data===200){
                toast.success('Password Reset Successfully!', {
                  position: "bottom-left",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });      
                setTimeout(() => { window.location.replace('/EditProfile')  }, 2500);
              } else {
                setdisable(false)
                toast.error('Current Password is Wrong!!', {
                  position: "bottom-left",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });  
              }
                 
          })
          .catch(err =>{
              setdisable(false) 
              console.log(err)
              toast.error('Unable to reset the password please login again', {
                position: "bottom-left",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });  
          })
        }       
    }

  return(
    <div className="edit_profile">
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
      <div className="sub_header px-4">
        <h3>Edit Profile</h3>
        <p className="fw-bold">{AuthService.getCurrentUser().firstName}&nbsp;{AuthService.getCurrentUser().lastName}&nbsp;-&nbsp;{AuthService.getCurrentUser().designation}</p>
      </div>

      <div className="container pt-2">
        <div className="row  Edit_Center">
          <div className="col-md-7 col-sm-12">
            <div>
                <form onSubmit={handle_InfoUpdateSubmit}>
                <legend>Personal Information</legend>
                {/* 1st row */}
                <div className="row">
                  <div className="col-md-6">
                      <label for="firstname" className="form-label">First Name *</label>
                      <div className="input-group">
                      <input type="text" className="form-control" name="firstname" id="firstname" placeholder="Enter the New First Name" value={firstName} onChange = {(e) => setfirstName(e.target.value.trim())}  required/>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <label for="lastname" className="form-label">Last Name *</label>
                      <div className="input-group">
                      <input type="text" className="form-control" name="lastname" id="lastname" placeholder="Enter the New Last Name" value={lastName} onChange = {(e) => setlastName(e.target.value.trim())}  required/>
                      </div>
                  </div>
                </div>
                {/* 2nd row */}
                <div className="row"> 
                  <div className="col-md-6">
                  <label for="email" className="form-label">E-Mail Address *</label>
                      <div className="input-group">
                        <input type="text" className="form-control" name="email" id="email" placeholder="Enter the New E-Mail Address" value={email} readonly/>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <label for="designation" className="form-label">Designation *</label>
                      <div className="input-group">
                        <input type="text" className="form-control" name="designation" id="designation" placeholder="Enter the New Designation" value={designation} onChange = {(e) => setdesignation(e.target.value.replace(/  +/g, ' '))} required/>
                      </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
                    {/* <button type="reset" className="btn btn-secondary fw-bolder" id="btn-edit-close">Clear All</button> */}
                    <button type="submit" className="btn btn-primary fw-bolder" id="btn-edit-update" disabled={isUpdatePersonalInfo || disable}>Update</button>
                </div>
                </form>
            </div>
            <hr/>
            <div>
                <form onSubmit={handleSubmit_ResetPassword}>
                <legend>Reset Password</legend>
                {/* 1st row */}
                <div className="row">
                  <div className="col-md-4">
                  <label for="currentpassword" className="form-label">Current Password</label>
                      <div className="input-group">
                        <input type="password" className="form-control" name="currentpassword" id="currentpassword" placeholder="Enter the Old Password" value={currentpassword} onChange = {(e) => setcurrentpassword(e.target.value)} required/>
                      </div>
                  </div>
                  <div className="col-md-4">
                  <label for="newpassword" className="form-label">New Password</label>
                      <div className="input-group">
                        <input type="password" className="form-control" name="newpassword" id="newpassword" placeholder="Enter the New Password" value={password} onChange = {(e) => setPassword(e.target.value)} required/>
                      </div>
                      <div className="Err_msg_validator"><PasswordStrengthMeter password={password}/></div>
                  </div>
                  <div className="col-md-4">
                      <label for="cnpassword" className="form-label">Confirm New Password</label>
                      <div className="input-group">
                        <input type="password" className="form-control" name="cnpassword" id="cnpassword" placeholder="Re-Type the New Password" value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} required/>
                      </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
                    <div className="Err_msg"><h6>{passwordErrorMsg}</h6></div>
                    {/* <button type="reset" className="btn btn-secondary fw-bolder" id="btn-edit-close" onClick={()=>{setPassword('');setConfirmPassword('')}}>Clear All</button> */}
                    <button type="submit" className="btn btn-primary fw-bolder" id="btn-edit-update" disabled={isUpdatePassword || disable}>Update</button>
                </div>
                </form>
            </div>
            </div>
            
            <div className="col-md-5 col-sm-12">
            <div className="edit_profile_right">
              <div className="edit_profile_right_body">
                <div className="edit_profile-card fw-bold">
                  <div className="row">
                    <ProfilePicture/>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;

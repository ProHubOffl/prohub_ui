import React,{useState,useEffect} from 'react'
import "../../Style/UploadProfile.css"
import Unknown_image from "../../images/Unknown.png"
import $ from "jquery";
import UserImageService from '../../service/userimage/UserImageService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from "react-image-lightbox";


function ProfilePicture() {
    const[Image_isOpen,setImage_isOpen]=useState(false)
    const [imageData, setImageData] = useState(null);
    const [HasUserProfile, SetHasUserProfile] = useState(false);
    const [HasImagePreview, SetHasImagePreview] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const[selectedFile,setSelectedFile] = useState(undefined)
    const[disable,setdisable] = useState(false)

    const handleUploadClick = event => {
      let file = event.target.files[0];
      setSelectedFile(event.target.files)
      setImagePreview(URL.createObjectURL(file));
      SetHasImagePreview(true);
  };

  const ProfileImageSubmit = async (e) => {
    e.preventDefault()
    let data = new FormData()
    data.append('data',selectedFile[0])
    setdisable(true)
    await UserImageService.uploadImage(data)
    .then(response => {
      if(response.data == 200){
        toast.success('Profile picture Successfully Uploaded!', {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });      
          setTimeout(() => { window.location.replace('/EditProfile')  }, 2500);
      } else {
        setdisable(false)
        toast.error('Profile picture size is Big!!', {
          position: "bottom-right",
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
        setdisable(false)
        toast.error('Unable to upload at the moment plz login again', {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });  
        console.log(err);
    })
  }

  const RemoveImage_Handler = (e) =>{
    setdisable(true)
    UserImageService.RemoveImage()
    .then(response => {
      toast.success('Profile picture is Successfully Deleted!', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });      
        setTimeout(() => { window.location.replace('/EditProfile')  }, 2500);
    })
    .catch(err => {
      setdisable(false)
      toast.error('Unable to Remove at the moment plz login again', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });  
      console.log(err)
    })
  }
    
    useEffect(() => {
      UserImageService.getImage()
      .then(result => {
          console.log(result.data)
          setImageData(result.data)
          SetHasUserProfile(true)
      })
      .catch(error => console.log(error))

      const input = document.getElementById('newProfilePhoto')
      input.addEventListener('change', (event) => {
        const target = event.target
          if (target.files && target.files[0]) {

            /*Maximum allowed size in bytes
              5MB Example
              Change first operand(multiplier) for your needs*/
            const maxAllowedSize = 2 * 1024 * 1024;
            if (target.files[0].size > maxAllowedSize) {
              toast.error('Profile picture Maximum size is 2MB', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });  
              // Here you can ask your users to load correct file
              target.value = ''
            }
        }
      })
},[])

  return (
    <>
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
    <form onSubmit={ProfileImageSubmit}>
      <legend>Upload Image</legend>
        <div className="profile-pic-wrapper">
          <div className="pic-holder">
          {
            (HasImagePreview)
            ?
            <img
            src={imagePreview}
            alt="Profile"
            id="profilePic" className="pic"
            />
            :
              (HasUserProfile)
              ?
                  <img
                  src={`data:image/jpeg;base64,${imageData}`}
                  alt="Profile"
                  id="profilePic" className="pic"
                  />
                  : 
                  <img
                  src={Unknown_image}
                  alt="Profile"
                  id="profilePic" className="pic"
                  />
            } 
          <label for="newProfilePhoto" className="upload-file-block">
            <div className="text-center">
              <div className="mb-2">
                <i className="fa fa-camera fa-2x"></i>
              </div>
              <div className="text-uppercase">
                Upload <br /> Profile Photo
              </div>
            </div>
          </label>
            <input type="file" className="uploadProfileInput" name="profile_pic" id="newProfilePhoto" accept="image/*" onChange={handleUploadClick} style={{display: "none"}} />
          </div>
        </div>

      {Image_isOpen && (
          <Lightbox
          mainSrc={`data:image/jpeg;base64,${imageData}`}
          onCloseRequest={() => setImage_isOpen(false)}
         />
      )}

      <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
        <div className="container">
          <div className="row"><button type="submit" className="btn btn-secondary fw-bolder" id="btn-edit-update" disabled={!HasImagePreview || disable}>Upload Image</button></div>
          <div className="row"><button type="button" className="btn btn-secondary fw-bolder" id="btn-edit-close" disabled={!HasUserProfile || disable} onClick={RemoveImage_Handler}>Remove Current Image</button></div>
          <div className="row"><button type="button" className="btn btn-primary fw-bolder" id="btn-edit-update" onClick={() => setImage_isOpen(true)} disabled={!HasUserProfile || disable}>View Profile</button></div>
        </div>
      </div>
    </form>
    </>
  )
}

export default ProfilePicture
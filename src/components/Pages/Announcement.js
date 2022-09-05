import React, { useEffect, useState } from "react";
import AnnouncementService from "../../service/announcement/AnnouncementService";
import AuthService from "../../service/authentication/AuthService";
import "../../Style/Announcement.css"
import AddAnnouncement from "./AddAnnouncement";
import UpdateAnnouncement from "./UpdateAnnouncement";
import { toast, ToastContainer } from 'react-toastify';

const Announcement = () => {
  const currentProject = AuthService.getCurrentProject().projectName

  const[announcements,setAnnouncements] = useState([])
  const[announcementError, setAnnouncementError] = useState('')
  const[selectedAnnouncement,setSelectedAnnouncement] = useState({})

  const deleteAnnouncement = (announcementId) => {
    AnnouncementService.deleteAnnouncement(announcementId)
    .then(response => {
      toast.success('Announcement Removed Successfully', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      window.location.replace("/Announcement")
    })
    .catch(err => {
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

  useEffect(() => {
    AnnouncementService.getAnnouncementsByProject(currentProject)
    .then(response => {
      setAnnouncements(response.data)
    })
    .catch(err => {
      setAnnouncementError('Unable to fetch the announcements at the moment')
      toast.error('Unable to fetch the announcements at the moment', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
    })
  },[])
  return (<div>
      <div className="sub_header px-4">
          <h3>Announcements</h3>
          <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
      </div>

      <div className="announcement">
        <div className="container">
        
        <button type="button" className="btn btn-primary fw-bolder btn-AddUserRole" id="btn-Create" data-bs-toggle="modal" data-bs-target="#AddAnnouncement">
          Add Announcement
        </button>
        
          <div className="row pt-2">
            {
              announcements.map(announcement => {
                return(
                  <div className="col-lg-4 col-md-6 col-sm-12 pb-2">
                    <div className="card announcement-card" key={announcement.announcementId}>
                      <h5 className="card-header">{announcement.title}</h5>
                      <div className="card-body">
                        <h5 className="card-title">{announcement.author} - {announcement.updatedDate == null ? announcement.createdDate : announcement.updatedDate}</h5>
                        <p className="card-text">{announcement.description}</p>
                        
                        <button type="button" className="btn btn-primary fw-bolder btn-announcement" id="btn-Create" onClick={() => setSelectedAnnouncement(announcement)} data-bs-toggle="modal" data-bs-target="#UpdateAnnouncement">
                          Edit
                        </button>
                        <button type="button" className="btn btn-danger fw-bolder btn-announcement m-1" onClick={() => deleteAnnouncement(announcement.announcementId)}>Delete</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className="modal fade" id="AddAnnouncement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <AddAnnouncement />
      </div>
      <div className="modal fade" id="UpdateAnnouncement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <UpdateAnnouncement announcement={selectedAnnouncement}/>
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
  </div>);
};

export default Announcement;

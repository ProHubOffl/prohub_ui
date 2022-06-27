
import React from "react";
import "../../Style/Announcement.css"
import AddAnnouncement from "./AddAnnouncement";
import UpdateAnnouncement from "./UpdateAnnouncement";

const Announcement = () => {
  return (<div>
      <div className="sub_header px-4">
          <h3>Announcements</h3>
          <p className="fw-bold">Project / <span className="fw-bolder">[Project Name]</span></p>
      </div>

      <div className="announcement">
        <div className="container">
        
        <button type="button" className="btn btn-primary fw-bolder btn-AddUserRole" id="btn-Create" data-bs-toggle="modal" data-bs-target="#AddAnnouncement">
          Add Announcement
        </button>
        
          <div className="row pt-2">
            {/* announcement card start */}
            <div className="col-lg-4 col-md-6 col-sm-12 pb-2">
              <div className="card announcement-card">
                <h5 className="card-header">Title</h5>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  
                  <button type="button" className="btn btn-primary fw-bolder btn-announcement" id="btn-Create" data-bs-toggle="modal" data-bs-target="#UpdateAnnouncement">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            {/* announcement card End */}
          </div>
        </div>
      </div>

      <div className="modal fade" id="AddAnnouncement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <AddAnnouncement />
      </div>
      <div className="modal fade" id="UpdateAnnouncement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <UpdateAnnouncement />
      </div>
  </div>);
};

export default Announcement;

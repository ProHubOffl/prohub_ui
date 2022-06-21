
import React from "react";
import "../../Style/Announcement.css"

const Announcement = () => {
  return (<div>
      <div className="sub_header px-4">
          <h3>Announcements</h3>
          <p className="fw-bold">Project / <span className="fw-bolder">[Project Name]</span></p>
      </div>

      <div className="announcement">
        <div className="container">
          <div className="row pt-2">
            {/* announcement card start */}
            <div className="col-lg-4 col-md-6 col-sm-12 pb-2">
              <div className="card announcement-card">
                <h5 className="card-header">Title</h5>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <button type="submit" id="btn-announcement" className="btn">
                    Go somewhere
                  </button>
                </div>
              </div>
            </div>
            {/* announcement card End */}
          </div>
        </div>
      </div>
  </div>);
};

export default Announcement;

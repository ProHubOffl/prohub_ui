import React, { useState } from 'react';
import AnnouncementService from '../../service/announcement/AnnouncementService';
import "../../Style/Project.css";
import { toast, ToastContainer } from 'react-toastify';

function UpdateAnnouncement(props) {
    const[newTitle,setNewTitle] = useState('')
    const[newDescription,setNewDescription] = useState('')

    const handleUpdateAnnouncement = (e) => {
        e.preventDefault();
        const updatedAnnouncement = {
            announcementId:props.announcement.announcementId,
            projectName:props.announcement.projectName,
            title:newTitle === '' ? props.announcement.title : newTitle,
            description:newDescription === '' ? props.announcement.description : newDescription,
            author:props.announcement.author,
            createdDate:props.announcement.createdDate,
            updatedDate:new Date().toUTCString()
        }
        AnnouncementService.updateAnnouncement(updatedAnnouncement,props.announcement.announcementId)
        .then(response => {
            toast.success('Announcement Updated Successfully', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.replace("/Announcement")
            setNewTitle('')
            setNewDescription('')
        })
        .catch(err => {
            console.log(err)
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
        <div className="project-form">
            <div className="modal-dialog modal-dialog">
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bolder" id="CreateUser">Update Announcement</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="mail" className="form-label">Title *</label>
                                    <input type="text" className="form-control" id="mail" placeholder="Enter Announcement Title" defaultValue={props.announcement.title} onChange={(e) => setNewTitle(e.target.value)} required/>
                                </div>
                            </div>
                            
                            <div className="row">
                                <label for="description" className="form-label">Description *</label>
                                <div class="input-group mb-3">
                                    <textarea rows="5" className="form-control border-secondary" id="description" placeholder="Enter the Description" defaultValue={props.announcement.description} onChange={(e) => setNewDescription(e.target.value)} required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bolder" id="btn-project-close" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bolder" id="btn-project-create" onClick={handleUpdateAnnouncement}>Update</button>
                        </div>
                    </div>
                </form>
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
        </div>
    );
}

export default UpdateAnnouncement;

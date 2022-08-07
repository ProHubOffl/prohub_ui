import React, { useEffect, useState } from 'react';
import "../../Style/ViewBacklog.css"
import EditBacklog from "./EditBacklog";
import BacklogService from '../../service/backlog/BacklogService';
import BacklogCommentService from '../../service/backlog/BacklogCommentService';
import AuthService from '../../service/authentication/AuthService';
import { toast, ToastContainer } from 'react-toastify';

function ViewBacklog(props) {

    const[backlog, setBacklog] = useState({})
    const[comments, setComments] = useState([])
    const[newComment, setNewComment] = useState('')

    const user = AuthService.getCurrentUser();
<<<<<<< HEAD
    const currentProject = AuthService.getCurrentProject().projectName
=======
    const currentProject = AuthService.getCurrentProject().projectName;
>>>>>>> 25daa99 (Added Navbar options for Video chat)

    const addNewComment = (e) => {
        e.preventDefault()
        const backlogComment = {
            backlogId:props.match.params.backlogId,
            comment:newComment,
            commentOwner:user.email,
            timeStamp: new Date().toISOString().slice(0, 10)
        }
        BacklogCommentService.addBacklogComment(backlogComment)
        .then(response => {
            window.location.reload()
            toast.success('Backlog Comment Added Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setNewComment('')
        })
        .catch(err => {
            toast.error('Unable to proceed your request', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    const deleteComment = (commentId) => {
        BacklogCommentService.deleteBacklogComment(commentId)
        .then(response => {
            window.location.reload()
            toast.success('Comment Deleted Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch(err => {
            toast.error('Unable to proceed your request', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    useEffect(() => {   
        BacklogService.getBacklogByBacklogId(props.match.params.backlogId)
        .then(response => {
            setBacklog(response.data)
        })
        .catch(err => console.log(err));

        BacklogCommentService.getCommentsByBacklog(props.match.params.backlogId)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div className="ViewBacklog">
            <div className="sub_header px-4">
                <h3>{backlog.title}</h3>
                <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <div className="ViewBacklog-left">
                            <h4></h4>
                            <form className="ViewBacklog_left" action='#'>
                                <div >
                                    <div className="row">
                                    <div className="col-md-12">
                                        <label for="comment" className="form-label">Comments</label> <br></br>
                                        <textarea width="100%" rows="2" className="form-control border-secondary" id="comment" placeholder="Enter Your Comment" onChange={(e) => setNewComment(e.target.value)} required></textarea>
                                    </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
                                    <button type="submit" className="btn btn-primary fw-bolder" id="btn-backlog-create" onClick={addNewComment}>Comment</button>
                                </div>
                            </form>
                            <div>
                                <div className="backlog-comment">
                                    {
                                        comments.length > 0 ?
                                        comments.map(comment => {
                                            return(
                                                <div className="box">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{comment.commentOwner}</h5>
                                                        <span>{comment.timeStamp}</span>
                                                        <p class="card-text">{comment.comment}</p>
                                                        <button className="btn btn-danger fw-bolder" onClick={() => deleteComment(comment.commentId)}>Delete</button>
                                                    </div>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                        <h6>No Comments Available at the Moment</h6>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <div className="ViewBacklog-right">
                            <div className='header'>
                                <h4>{backlog.status}</h4>
                                <button type='button' className="btn btn-primary fw-bolder" id="btn-viewBacklog-edit"  data-bs-toggle="modal" data-bs-target="#EditBacklog">Edit</button>
                            </div>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Title</th>
                                        <td>{backlog.title}</td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td>{backlog.type}</td>
                                    </tr>
                                    <tr>
                                        <th>Project</th>
                                        <td>{backlog.projectName}</td>
                                    </tr>
                                    <tr>
                                        <th>Created By</th>
                                        <td>{backlog.createdBy}</td>
                                    </tr>
                                    <tr>
                                        <th>Created At</th>
                                        <td>{backlog.createdAt}</td>
                                    </tr>
                                    <tr>
                                        <th>Last Updated By</th>
                                        <td>{backlog.lastUpdatedUser}</td>
                                    </tr>
                                    <tr>
                                        <th>Last Updated On</th>
                                        <td>{backlog.lastUpdated}</td>
                                    </tr>
                                    <tr>
                                        <th>Assignee</th>
                                        <td>{backlog.assignee}</td>
                                    </tr>
                                    <tr>
                                        <th>Sprint</th>
                                        <td>{backlog.sprint}</td>
                                    </tr>
                                    <tr>
                                        <th>Story Points</th>
                                        <td>{backlog.storyPoints}</td>
                                    </tr><br></br>
                                    <tr>
                                        <th colspan="2">Description</th>
                                    </tr>
                                    <tr>
                                        <td colspan="2" >
                                            {backlog.description}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="EditBacklog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <EditBacklog backlog={backlog}/>
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

export default ViewBacklog;

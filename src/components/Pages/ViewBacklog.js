import React from 'react';
import "../../Style/ViewBacklog.css"

function ViewBacklog(props) {
    return (
        <div className="ViewBacklog">
            <div className="sub_header px-4">
                <h3>View Backlog</h3>
                <p className="fw-bold">Project / <span className="fw-bolder">[Project Name]</span></p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <div className="ViewBacklog-left">
                            <h4>Left</h4>
                            <form className="ViewBacklog_left">
                                <div >
                                    <div className="row">
                                    <div className="col-md-12">
                                        <label for="comment" className="form-label">Comment</label> <br></br>
                                        <textarea width="100%" rows="2" className="form-control border-secondary" id="comment" placeholder="Enter Your Comment" required>
                                        </textarea>
                                    </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
                                    <button type="submit" className="btn btn-primary fw-bolder" id="btn-backlog-create">Post</button>
                                </div>
                            </form>
                            <div>
                            <h5>Previous Comments</h5>
                                <div className="backlog-comment">
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    {/* comment section start */}
                                    <div className="box">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">name</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        </div>
                                    </div>
                                    {/* comment section End */}
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <div className="ViewBacklog-right">
                            <h3>right</h3>
                            <hr></hr>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Title</th>
                                        <td>[titel]</td>
                                    </tr>
                                    <tr>
                                        <th>Project</th>
                                        <td>[project name]</td>
                                    </tr>
                                    <tr>
                                        <th>Assignee</th>
                                        <td>[assignee name]</td>
                                    </tr>
                                    <tr>
                                        <th>Sprint</th>
                                        <td>[sprint]</td>
                                    </tr>
                                    <tr>
                                        <th>Story Points</th>
                                        <td>[story points]</td>
                                    </tr><br></br>
                                    <tr>
                                        <td colspan="2">Description</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" >
                                            [Description]
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBacklog;

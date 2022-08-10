import React from 'react'
import Announcement from "../Pages/Announcement";
import Board from "../Pages/Board";
import Backlog from "../Pages/Backlog";
import Documents from "../Pages/Documents";
import EditProfile from '../Pages/EditProfile';
import ViewBacklog from '../Pages/ViewBacklog';
import Chat from '../Pages/Chat';
import UpdateProject from '../Pages/UpdateProject';
import PersonalDashboard from '../Pages/PersonalDashboard';
import ProjectDashboard from '../Pages/ProjectDashboard';
import VideoHome from '../Pages/VideoConference/VideoHome';
import Room from '../Pages/VideoConference/Room';

import {
    Route,
    Switch
  } from "react-router-dom";


function Routing() {
    return (
            <Switch>
                <Route exact path="/Announcement" component={Announcement} />
                <Route exact path="/Backlog" component={Backlog} />
                <Route exact path="/document" component={Documents} />
                <Route exact path="/Board" component={Board} />
                <Route exact path="/EditProfile" component={EditProfile} />
                <Route exact path="/Backlog/:backlogId" component={ViewBacklog} />
                <Route exact path="/Chat" component={Chat} />
                <Route exact path="/project" component={UpdateProject} />
                <Route exact path="/dashboard" component={ProjectDashboard} />
                <Route exact path="/personaldashboard" component={PersonalDashboard} />
                <Route exact path="/videoChat" component={VideoHome} />
                <Route exact path="/room/:roomId" component={Room} />
                <Route exact path="*" component={Board} />
            </Switch>        
    )
}

export default Routing
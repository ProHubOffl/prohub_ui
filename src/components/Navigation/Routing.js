import React from 'react'
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import ForgotPassword from "../Pages/ForgotPassword";

import {
    Route,
    Switch
  } from "react-router-dom";

function Routing() {
    return (
            <Switch>
                <Route exact path="/authenticate" component={Signin} />
                <Route exact path="/" component={Signin} />
                <Route exact path="/register" component={Signup} /> 
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route path="*" component={Signin} />                           
            </Switch>        
    )
}

export default Routing
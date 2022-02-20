import React from 'react'
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";

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
                <Route path="*" component={Signin} />                           
            </Switch>        
    )
}

export default Routing
import React,{useState,useEffect} from 'react';
import Navbar from "./Navbar";
import DropdownList from "./DropdownList";
import Sidebar from "./Sidebar";
import HomeRouting from './HomeRouting';
import {BrowserRouter as Router} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"
import "../../Style/Home.css"
import logo from "../../images/prohub.png"
import { css } from "@emotion/react";
import UpdateProject from "../Pages/UpdateProject";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  font-weight:bold;
`;

function Home(props) {
    const[is_this_open,set_open]=useState(false);
    const toggle=()=>{
      set_open(!is_this_open)
    }

    const [loading,Set_loading]=useState(false);
    useEffect(()=>{
      Set_loading(true)
      setTimeout(()=>{
        Set_loading(false)
      },400)
    },[])

    return (
      <Router>
        <div>
        {
            loading ?
            (<div className='Home_loading'>              
                <img src={logo} alt='logo'/>            
                <ClipLoader
                css={override}
                size={380}
                color={"#ffff"}
                loading={loading}
                />             
              </div>
            )
            :
            (<>
            <Navbar toggle={toggle} />
            <DropdownList is_open={is_this_open} toggle={toggle} />
            <Sidebar/> 
            <HomeRouting/>
            </>
            )
          }
        </div>
      </Router>
    );
}

export default Home;
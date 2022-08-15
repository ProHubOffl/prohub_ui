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
import ProjectUserService from '../../service/user/ProjectUserService';
import AuthService from '../../service/authentication/AuthService';
import EmptyProject from '../Pages/EmptyProject';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  font-weight:bold;
`;

function Home(props) {
    const[is_this_open,set_open]=useState(false);
    const toggle=()=>{
      set_open(!is_this_open)
    }
    const[hasProjects,setHasProjects] = useState(true)
    const currentUser = AuthService.getCurrentUser().email;

    const [loading,Set_loading]=useState(false);

    const token = AuthService.getCurrentUser().jwtToken
    const decode = JSON.parse(atob(token.split('.')[1]));

    useEffect(()=>{
      if (decode.exp * 1000 < new Date().getTime()) {
          setTimeout(() => { AuthService.logout()  }, 2500);
      } else {
        ProjectUserService.getProjectsByUser(currentUser)
        .then(res => {
          if(!(res.data.length > 0)){
            setHasProjects(false)
          } else {
            document.getElementsByClassName('navbar_display').style.display = "none"
          }
        })
        .catch(err => console.log(err))
      }

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
              {
                hasProjects ? 
                (
                  <>
                    <Navbar toggle={toggle}/>
                    <DropdownList is_open={is_this_open} toggle={toggle} />
                    <Sidebar/> 
                    <HomeRouting/>
                  </>
                )  : 
                (
                  <>
                    <EmptyProject />
                  </>
                )
              }
              
            </>
            )
          }
        </div>
      </Router>
    );
}

export default Home;
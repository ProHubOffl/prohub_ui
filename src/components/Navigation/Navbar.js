import React, { useEffect, useState } from 'react'
import styled,{css} from 'styled-components';
import {Link} from "react-router-dom";
import { dashboardData } from '../../data/Dashboarddata';
import { projectData } from '../../data/Projectdata';
import Bars from "../../assets/bars.svg";
import logo from "../../images/prohub.png"
import CreateProject from "../Pages/CreateProject";

import "../../Style/Navbar.css"
import { BsChatLeftTextFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AuthService from '../../service/authentication/AuthService';
import ProjectUserService from '../../service/user/ProjectUserService';

const Nav = styled.nav`
    display:flex;
    height: 50px;
    position:fixed;
    width:100%;
    z-index: 999;
    background: linear-gradient(180deg, #003847 0%, rgba(0, 56, 71, 0.75) 100%);
    box-shadow: 0px 6px 8px #9EB3B9;
    `;

const NavLink=css`
    display:flex;
    align-items:center;
    padding-right: 15px;
    height:100%;
    cursor:pointer;
    text-decoration:none;
    font-weight: bold;
    
`;


const Logo=styled(Link)`
    ${NavLink}
    font-style:italic;
    font-size: 2rem;
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 2rem;
    font-weight: bold;
    :hover{
        color: orange;
    }
    `;

const Image_section = styled(Link)`
    ${NavLink}
    `;

const MenuBars=styled.i`
display: none;
@media screen and (max-width:1000px){
    display: block;
    background-image: url(${Bars});
    background-size: contain;
    height: 30px;
    width: 30px;
    cursor: pointer;
    position: absolute;
    top: 4px;
    right: 0;
    transform: translate(-50%,20%);
    transition: width 0.2s;
    :hover{
        width: 40px;
    }
    }
`;

const NavMenu=styled.div`
    display:flex;
    @media screen and (max-width:1000px){
        display: none;
    }
    font-size: 100%;
`;

function Navbar(props) {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
      const currentUser = AuthService.getCurrentUser();
      const [projectData, setProjectData] = useState([]);
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 600 }}
          role="presentation"
          //onClick={toggleDrawer(anchor, false)}
          //onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                Siva
            </List>
        </Box>
      );

      useEffect(() => {
        ProjectUserService.getProjectsByUser(currentUser.email)
        .then(response => {
            setProjectData(response.data)
        })
        .catch(err => {console.log(err)})
    },[])

    return (       
        <div  className="pb-5">
            <Nav>
                <div className="logo_section">
                    <div className="logo_pic" >
                        <Image_section href="#" onClick={()=>{}}>
                            <img src={logo} alt='logo'/>
                        </Image_section>
                    </div>
                    <Logo to="/home" onClick={()=>{}}>
                        ProHub
                    </Logo>
                </div>

                <MenuBars onClick={props.toggle}/>
                <div className="nav_Section">
                    <div className="nav_items">
                        <NavMenu>
                            <DropdownButton title="Active Projects" id="bg-nested-dropdown">
                                {
                                    projectData.map((project,index1)=>(           
                                        <Dropdown.Item id="Nav_option"  onClick={()=>{}} key={index1} href="#">{project.projectName}</Dropdown.Item>
                                    ))
                                }
                                <button type="button" className="btn btn-primary fw-bolder" id="btn-CreateProject" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Create Project
                                </button>
                            </DropdownButton>
                            <DropdownButton title="Dashboard" id="bg-nested-dropdown">
                                {
                                    dashboardData.map((item2,index2)=>(           
                                    <Dropdown.Item id="Nav_option"  onClick={()=>{}} key={index2} href="#">{item2.sub2}</Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>
                        </NavMenu>

                        <input className="form-control-search" type="text" placeholder="Search.." aria-label="Search"></input>
                        <div className="notification_option">
                            <a href='#'>
                                Notification
                                <Badge anchorOrigin={{ horizontal:'right', vertical:'top' }} color="error" badgeContent={5} max={9} id="num_notification">
                                    <NotificationsActiveIcon id="notification" />
                                </Badge>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="chat_btn">
                    {['right'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <button onClick={toggleDrawer(anchor, true)} className="btn btn-info btn-lg" id="chat_button">
                                <TiArrowBack/> <b>Chat</b> <BsChatLeftTextFill/>
                            </button> 
                                <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                >
                                    {list(anchor)}
                                </Drawer>
                        </React.Fragment>   
                    ))}
                </div>     
            </Nav>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <CreateProject />
            </div>            
        </div>         
    )
}

export default Navbar
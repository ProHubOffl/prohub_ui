import React, { useEffect, useState } from 'react'
import styled,{css} from 'styled-components';
import {Link} from "react-router-dom";
import Bars from "../../assets/bars.svg";
import logo from "../../images/prohub.png"
import CreateProject from "../Pages/CreateProject";
import Chat from '../Pages/Chat';

import "../../Style/Navbar.css"
import { BsChatLeftTextFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import VideocamIcon from '@mui/icons-material/Videocam';
import Select from 'react-select';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AuthService from '../../service/authentication/AuthService';
import ProjectUserService from '../../service/user/ProjectUserService';
import BacklogService from '../../service/backlog/BacklogService';

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
      const [projectBacklogs,setProjectBacklogs] = useState([]);
    
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
                <Chat />
            </List>
        </Box>
      );

      const customSearchStyles = {
        control: (base,state) => ({
          ...base,
          borderColor: state.isFocused ? "green" : "blue",
          boxShadow: state.isFocused ? null : null,
          height:30,
          minHeight:30,
          borderRadius: 20,
          marginTop:2,
          border:'2px solid blue',
          "&:hover": {
            borderColor: state.isFocused ? "blue" : "green"
          }
        })
      };

      useEffect(() => {
        ProjectUserService.getProjectsByUser(currentUser.email)
        .then(response => {
            setProjectData(response.data)
        })
        .catch(err => {console.log(err)})

        BacklogService.getBacklogbyEmail(currentUser.email)
        .then(response => {
            let backlogs = []
            response.data.map(backlog => {
                let backlogItem = {label:backlog.title,value:backlog.backlogId}
                backlogs.push(backlogItem)
            })
            setProjectBacklogs(backlogs)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const setcurrentProject = (project) => {
        localStorage.setItem("project", JSON.stringify(project));
        window.location.reload()
    }
    
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
                                        <Dropdown.Item id="Nav_option" key={index1} href="#" onClick={()=>{setcurrentProject(project)}}>
                                            {project.projectName} <Link to={{pathname:"/project", state:{project:project}}}><span style={{textAlign:'right',alignItems:'right',alignContent:'right'}}><i className="bi bi-pencil-square"></i></span></Link>
                                        </Dropdown.Item>
                                    ))
                                }
                                <button type="button" className="btn btn-primary fw-bolder" id="btn-CreateProject" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Create Project
                                </button>
                            </DropdownButton>
                            <button id="bg-nested-dropdown"  onClick={()=>{}} href="#">
                                <Link to="/personaldashboard" id='personaldashboard'>Personal&nbsp;Dashboard</Link>
                            </button>
                        </NavMenu>

                        <Select 
                            className="search-select-nav" 
                            placeholder="Search Backlogs" 
                            options={projectBacklogs}
                            onChange={opt => window.location.replace("/backlog/"+opt.value)}
                            styles={customSearchStyles} 
                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        />
                        <div className="notification_option">
                            <a href='/videoChat'>
                                Meet
                                <Badge anchorOrigin={{ horizontal:'right', vertical:'top' }} color="error" style={{marginLeft:'5px'}}>
                                    <VideocamIcon />
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
import React, { useState,useEffect } from "react";

//All the svg files
import Documents from "../../assets/draft.svg";
import Tickets from "../../assets/Tickets.svg";
import Announcement from "../../assets/Announcement.svg";
import Backlog from "../../assets/Backlog.svg";
import Board from "../../assets/Board.svg";
import PowerOff from "../../assets/power-off-solid.svg";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import AuthService from '../../service/authentication/AuthService';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import UserImageService from "../../service/userimage/UserImageService";
import Unknown_image from "../../images/Unknown.png"

const Container = styled.div`
    position: fixed;
    margin-top: 22vh;
    .active {
      border-right: 4px solid orange;

      img {
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
          brightness(103%) contrast(103%);
      }
    }
`;

const ButtonExpand = styled.button`
    background: linear-gradient(180deg, #003847 0%, rgba(0, 56, 71, 0.75) 100%);
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    //margin: 6.5rem 0 0 0.25rem;
    margin: 0 0 0 0.25rem;
    cursor: pointer;
    transition: border 0.2s;
    :hover{
      border: 1px solid orange;
  }

    display: flex;
    justify-content: center;
    align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: white;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
    background: linear-gradient(150deg, #003847 40%, rgba(0, 90, 71, 0.75) 10%);
    width: 3.0rem;
    height: 23.25rem;
    margin-top: 1rem;
    border-radius: 0 30px 30px 0;


    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    position: relative;
`;

const SlickBar = styled.ul`
    color: white;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, #003847 0%, rgba(0, 56, 71, 0.75) 100%);
    padding: 1.3rem 0 1.1rem 0;

    position: absolute;
    top: 6rem;
    left: 0;

    width: ${(props) => (props.clicked ? "12rem" : "3rem")};
    transition: all 0.5s ease;
    border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
    text-decoration: none;
    color: white;
    width: 100%;
    padding: 1rem 0 0.5rem 0.75rem;
    cursor: pointer;
    :hover{
      color: orange;
    }


    display: flex;

  &:hover {
    border-right: 4px solid yellow;


    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 2rem;
    height: auto;
    padding-right: 0.5rem;
    align-items: center;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(75%) contrast(85%);
  }
`;

const Text = styled.span`
    width: ${(props) => (props.clicked ? "100%" : "0")};
    overflow: hidden;
    margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
    transition: all 0.3s ease;
    :hover{
      color: orange;
    }
`;

const Profile = styled.div`
    width: ${(props) => (props.clicked ? "auto" : "3rem")};
    height: 4rem;
    margin: 1.5rem 0 0.5rem 0;
    border-radius: 0px 20px 20px 0px;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: ${(props) => (props.clicked ? "0.25rem" : "0")};
    margin-left: auto;
    background: linear-gradient(180deg, #003847 0%, rgba(0, 56, 71, 0.75) 100%);
    color: white;
    transition: all 0.3s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    
    &:hover {
      border: 2px solid orange;
      padding: 2px;
    }
  }
`;

const Details = styled.div`
    display: ${(props) => (props.clicked ? "flex" : "none")};
    justify-content: space-between;
    align-items: center;
`;

const Name = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1rem 0 1rem;
  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: orange;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
    border: none;
    width: 2rem;
    height: 2rem;
    background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    border: none;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Sidebar (){
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [imageData, setImageData] = useState('');
  const [HasUserProfile, SetHasUserProfile] = useState(false);

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handle_logout = () => {
    AuthService.logout()
    setOpen(false);
  };

  const first_name=AuthService.getCurrentUser().firstName.slice(0,10)
  const last_name=AuthService.getCurrentUser().lastName.slice(0,10)

  useEffect(() => {
    UserImageService.getImage()
        .then(result => {
            console.log(result.data)
            setImageData(result.data)
            SetHasUserProfile(true)
        })
        .catch(error => console.log(error))
  },[])

  return (
    <Container>
        <ButtonExpand clicked={click} onClick={() => handleClick()}></ButtonExpand>
      <SidebarContainer>
          <Profile clicked={profileClick}>
            {
            (HasUserProfile)
            ?
              <img
              onClick={() => handleProfileClick()}
              src={`data:image/jpeg;base64,${imageData}`}
              alt="Profile"
              />
            :
              <img
              onClick={() => handleProfileClick()}
              src={Unknown_image}
              alt="Profile"
              />
            }
            <Details clicked={profileClick}>
            <Name>
                <h4>{first_name}&nbsp;{last_name}</h4>
                <a href="#">View&nbsp;Profile</a>
            </Name>  
            <Logout>
                    <img src={PowerOff} alt="logout" onClick={handleClickOpen}/>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Use ProHub's service"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are You Sure You Want To Log Out?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handle_logout}>Yes</Button>
                      </DialogActions>
                    </Dialog>
            </Logout>           
            </Details>
          </Profile>    
        <SlickBar clicked={click}>
          <Item
            onClick={() => setClick(false)}
            exact
            activeClassName="active"
            to="/Board"
          >
            <img src={Board} alt="Board" />
            <Text clicked={click}>Board</Text>
          </Item>
          <Item
            onClick={() => setClick(false)}
            activeClassName="active"
            to="/Backlog"
          >
            <img src={Backlog} alt="Backlog" />
            <Text clicked={click}>Backlog</Text>
          </Item>
          <Item
            onClick={() => setClick(false)}
            activeClassName="active"
            to="/Document"
          >
            <img src={Documents} alt="Document" />
            <Text clicked={click}>Document</Text>
          </Item>
          <Item
            onClick={() => setClick(false)}
            activeClassName="active"
            to="/Announcement"
          >
            <img src={Announcement} alt="Announcement" />
            <Text clicked={click}>Announcement</Text>
          </Item>
          <Item
            onClick={() => setClick(false)}
            activeClassName="active"
            to="/Tickets"
          >
            <img src={Tickets} alt="Tickets" />
            <Text clicked={click}>Tickets</Text>
          </Item>
        </SlickBar>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;

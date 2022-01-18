import React, { useState } from "react";

//All the svg files
import Documents from "../../assets/draft.svg";
import Tickets from "../../assets/Tickets.svg";
import Announcement from "../../assets/Announcement.svg";
import Backlog from "../../assets/Backlog.svg";
import Board from "../../assets/Board.svg";
import PowerOff from "../../assets/power-off-solid.svg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";


const Container = styled.div`
    position: fixed;
    margin-top: 4.5rem;
    .active {
      border-right: 4px solid orange;

      img {
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
          brightness(103%) contrast(103%);
      }
    }
`;

const Button = styled.button`
    background: linear-gradient(180deg, #003847 0%, rgba(0, 56, 71, 0.75) 100%);
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 6.5rem 0 0 0.25rem;
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
    width: ${(props) => (props.clicked ? "17rem" : "3rem")};
    padding-left:${(props) => (props.clicked ? "1.8rem" : "0rem")};
    height: 4rem;
    margin: 1.5rem 0 0.5rem;
    //padding: 0.5rem 1rem;
    //border: 2px solid blue; 
    border-radius: 0px 20px 20px 0px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${(props) => (props.clicked ? "11rem" : "0")};

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
    padding: 0 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);

  return (
    <Container>
        <Button clicked={click} onClick={() => handleClick()}></Button>
      <SidebarContainer>
          <Profile clicked={profileClick}>
            <img
            onClick={() => handleProfileClick()}
            src="https://picsum.photos/200"
            alt="Profile"
            />
            <Details clicked={profileClick}>
            <Name>
                <h4>S&nbsp;Sivanujan</h4>
                <a href="#">View&nbsp;Profile</a>
            </Name>
            <Logout>
                <img src={PowerOff} alt="logout" />
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

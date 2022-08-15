import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../../Socket';
import "../../../Style/VideoChat.css"
import AuthService from '../../../service/authentication/AuthService';

const MainContainer = styled.div`
  
`;

const Row = styled.div`
`;

const Label = styled.label`
  font-size: 1.10rem;
`;

const Answer = styled.div`
  font-size: 1.10rem;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  /* margin-top: 35px; */
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  background-color: linear-gradient(rgb(0, 56, 71) 0%, rgba(0, 56, 71, 0.75) 100%);
  background: linear-gradient(rgb(0, 56, 71) 0%, rgba(0, 56, 71, 0.75) 100%);
  font-size: 25px;
  font-weight: 500;
  width:200px;
  /* margin-left:500px; */

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;
const VideoHome = (props) => {
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = AuthService.getCurrentProject().projectName.replace(/\s/g, "");
        const userName = AuthService.getCurrentUser().email;

        sessionStorage.setItem('videoUser', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = AuthService.getCurrentProject().projectName.replace(/\s/g, "");
    const userName = AuthService.getCurrentUser().email;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <>
    <div className="sub_header px-4">
      <h3>Start Conference Call</h3>
      <p className="fw-bold">Project / <span className="fw-bolder">{ AuthService.getCurrentProject().projectName}</span></p>
    </div>
    <div className="video_content">
    <MainContainer>
      <table align="center">
      <Row>
        <tr>
          <td className='video_text'><Label htmlFor="roomName">Room Name : </Label></td>
          <td className='video_text'><Answer id="roomName">{AuthService.getCurrentProject().projectName.replace(/\s/g, "")}</Answer></td>
        </tr>
      </Row>
      <Row>
        <tr>
          <td className='video_text'><Label htmlFor="userName">User Name : </Label></td>
          <td className='video_text'><Answer id="userName">{AuthService.getCurrentUser().email}</Answer></td>
        </tr>
      </Row>
        <tr>
          <td colSpan={2} align="center" className='video_text'>
            <JoinButton onClick={clickJoin}> Join </JoinButton>
            {err ? <Error>{errMsg}</Error> : null}
          </td>
        </tr>
      </table>
    </MainContainer>
    </div>
    <img className='connecting' src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/talking_stick.gif"/>
    </>
  );
};

export default VideoHome;

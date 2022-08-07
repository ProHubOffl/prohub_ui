import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../../Socket';
import "../../../Style/VideoChat.css"
import AuthService from '../../../service/authentication/AuthService';

const VideoHome = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
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
    <MainContainer>
      <Row>
        <Label htmlFor="roomName">Room Name: </Label>
        <Input type="text" id="roomName" value={AuthService.getCurrentProject().projectName.replace(/\s/g, "")} readOnly/>
      </Row>
      <Row>
        <Label htmlFor="userName">User Name: </Label>
        <Input type="text" id="userName" value={AuthService.getCurrentUser().email} readOnly/>
      </Row>
      <JoinButton onClick={clickJoin}> Join </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-right:720px
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 200px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;
  width:300px;
  margin-left:500px;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default VideoHome;

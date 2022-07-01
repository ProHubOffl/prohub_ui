import React, { useState } from 'react'
import { db, storage } from '../../Firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'
import "../../Style/Chat.css"
import AuthService from "../../service/authentication/AuthService";
import UserImageService from '../../service/userimage/UserImageService'
import { ToastContainer, toast } from 'react-toastify';

function SendMessage({ scroll }) {
    const currentProject = "Project One";

    const [msg, setMsg] = useState('')

    const currentUser = AuthService.getCurrentUser()

    async function uploadImage (e) {
        const image = e.target.files[0];
        console.log(image)
        if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    //setUrl(url);
                    sendMessage('',url)
                    /*await UserImageService.getImageByEmail(currentUser.email)
                    .then(response => {
                        db.collection(currentProject).add({
                            text: '',
                            imageMessage:url,
                            displayName: currentUser.firstName.slice(0,10),
                            email: currentUser.email,
                            photoUrl:`data:image/jpeg;base64,${response.data}`,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        setMsg('')
                        scroll.current.scrollIntoView({ behavior: 'smooth' })
                    })
                    .catch(err => {
                        db.collection(currentProject).add({
                            text: '',
                            imageMessage:url,
                            displayName: currentUser.firstName.slice(0,10),
                            email: currentUser.email,
                            photoUrl:'',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        setMsg('')
                        scroll.current.scrollIntoView({ behavior: 'smooth' })
                    })*/
                });
            });
        } else {
            toast.error('Please attach an jpeg/png image', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  
        }
    }

    function sendTextMessage(e) {
        e.preventDefault();
        sendMessage(msg,'')
    }

    function sendMessage(text, imageMessage) {
        console.log(text)
        console.log(imageMessage)
        UserImageService.getImageByEmail(currentUser.email)
        .then(response => {
            db.collection(currentProject).add({
                text: text,
                imageMessage:imageMessage,
                displayName: currentUser.firstName.slice(0,10),
                email: currentUser.email,
                photoUrl:`data:image/jpeg;base64,${response.data}`,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg('')
            scroll.current.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(err => {
            db.collection(currentProject).add({
                text: text,
                imageMessage:imageMessage,
                displayName: currentUser.firstName.slice(0,10),
                email: currentUser.email,
                photoUrl:'',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg('')
            scroll.current.scrollIntoView({ behavior: 'smooth' })
        })

    }
    return (
        <div>
            <form onSubmit={sendTextMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <div class="image-upload">
                        <label for="image-chat-input">
                            <i class="fa fa-camera" aria-hidden="true"></i>
                        </label>
                        <input id="image-chat-input" type="file" onChange={uploadImage} />
                    </div>
                    {/*<Input style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="file" onChange={uploadImage}>File Upload</Input>*/}
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '5px 0 -13px 0', maxWidth: '70px'}} type="submit">Send</Button>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}

export default SendMessage

import React, { useState } from 'react'
import { db, storage } from '../../Firebase'
import firebase from 'firebase'
import { Input } from '@material-ui/core'
import "../../Style/Chat.css"
import AuthService from "../../service/authentication/AuthService";
import UserImageService from '../../service/userimage/UserImageService'
import { ToastContainer, toast } from 'react-toastify';

function SendMessage({ scroll }) {
    const currentProject = AuthService.getCurrentProject().projectName;

    const [msg, setMsg] = useState('')

    const currentUser = AuthService.getCurrentUser()

    async function uploadImage (e) {
        const image = e.target.files[0];
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
                    sendMessage('',url,'','')
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

    function uploadDocument (e) {
        const document = e.target.files[0]
        const uploadTask = storage.ref(`documents/${document.name}`).put(document);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("documents")
                .child(document.name)
                .getDownloadURL()
                .then((url) => {
                    sendMessage('','',url,document.name)
                });
        });
    }

    function sendTextMessage(e) {
        e.preventDefault();
        if(msg !== ''){
            sendMessage(msg,'','','')
        }
    }

    function sendMessage(text, imageMessage, document, documentName) {
        UserImageService.getImageByEmail(currentUser.email)
        .then(response => {
            db.collection(currentProject).add({
                text: text,
                imageMessage:imageMessage,
                document:document,
                documentName: documentName,
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
                document:document,
                documentName: documentName,
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
            <div className='chat-container'>
                <form onSubmit={sendTextMessage}>
                    <div className="sendMsg row">
                        <div className='col-lg-9 col-md-9 col-sm-8 col-xs-6'>
                            <Input style={{ width: '100%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-xs-6 msg-col-2'>
                            <div class="image-upload">
                                <label for="image-chat-input">
                                    <div className='btn-msg'><i class="fa fa-camera" aria-hidden="true"></i></div>
                                </label>
                                <input id="image-chat-input" type="file" onChange={uploadImage} accept="image/*"/>
                            </div>
                            <div class="document-upload">
                                <label for="document-chat-input">
                                    <div className='btn-msg'><i class="fa fa-paperclip" aria-hidden="true"></i></div>
                                </label>
                                <input id="document-chat-input" type="file" onChange={uploadDocument} />
                            </div>
                            <div>
                                <button type='submit' className='btn-msg'>Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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

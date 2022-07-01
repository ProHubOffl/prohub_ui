import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../Firebase'
import SendMessage from './SendMessage'
import "../../Style/Chat.css"
import AuthService from "../../service/authentication/AuthService";
import Unknown_image from "../../images/Unknown.png"

function Chat() {
    const currentProject = AuthService.getCurrentProject().projectName

    const scroll = useRef()
    const [messages, setMessages] = useState([])

    const currentUsr = AuthService.getCurrentUser()
    useEffect(() => {
        db.collection(currentProject).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, imageMessage, displayName, email, photoUrl }) => {
                    if(imageMessage === '') {
                        return (
                            <div>
                                <div key={id} className={`msg ${email === currentUsr.email ? 'sent' : 'received'}`}>
                                    <img className='chat_img' src={photoUrl === '' ? Unknown_image : photoUrl} alt='' /><br/>
                                    <p className='chat'>{displayName}</p><br/><br/>
                                    <p className='chat'>{text}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <div key={id} className={`msg ${email === currentUsr.email ? 'sent' : 'received'}`}>
                                    <img className='chat_img' src={photoUrl === '' ? Unknown_image : photoUrl} alt='' /><br/>
                                    <p className='chat'>{displayName}</p><br/><br/>
                                    <img className='msg_img' src={imageMessage} alt="Image Message" />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat

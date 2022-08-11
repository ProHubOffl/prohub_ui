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
        <div className='container'>
            <div className="msgs">
                {messages.map(({ id, text, imageMessage, document, documentName, displayName, email, photoUrl }) => {
                    if(imageMessage === '') {
                        if(document === '') {
                            return (
                                <div className='chat-content'>
                                    <div key={id} className={`msg ${email === currentUsr.email ? 'sent' : 'received'}`}>
                                        <div className='chat-header'>
                                            <img className='chat_img' src={photoUrl === '' ? Unknown_image : photoUrl} alt='' /><br/>
                                            <p className='chat'>{displayName}</p>
                                        </div>
                                        <div className='chat-body'>
                                            <p className='chat'>{text}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className='chat-content'>
                                    <div key={id} className={`msg ${email === currentUsr.email ? 'sent' : 'received'}`}>
                                        <div className='chat-header'>
                                            <img className='chat_img' src={photoUrl === '' ? Unknown_image : photoUrl} alt='' /><br/>
                                            <p className='chat'>{displayName}</p>
                                        </div>
                                        <div className='chat-body'>
                                            <a className='chat_document' href={document} target="_blank">{documentName}</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                    } else {
                        return (
                            <div className='chat-content'>
                                <div key={id} className={`msg ${email === currentUsr.email ? 'sent' : 'received'}`}>
                                    <div className='chat-header'>
                                        <img className='chat_img' src={photoUrl === '' ? Unknown_image : photoUrl} alt='' /><br/>
                                        <p className='chat'>{displayName}</p>
                                    </div>
                                    <div className=''>
                                        <a target="_blank" href={imageMessage}>
                                            <img className='msg_img' src={imageMessage} alt="Image Message" />
                                        </a>
                                    </div>
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

import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "react-chat-demo-3d8bd.firebaseapp.com",
    projectId: "react-chat-demo-3d8bd",
    storageBucket: "react-chat-demo-3d8bd.appspot.com",
    messagingSenderId: "457269039308",
    appId: ""
})

const db = firebaseApp.firestore()

export { db }
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "react-chat-demo-3d8bd.firebaseapp.com",
    projectId: "react-chat-demo-3d8bd",
    storageBucket: "react-chat-demo-3d8bd.appspot.com",
    messagingSenderId: "457269039308",
    appId: "1:457269039308:web:13a9365545c9ee54d77269"
})

const db = firebaseApp.firestore()

const storage = firebaseApp.storage()

export { db, storage }
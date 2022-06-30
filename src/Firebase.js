import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvj8ySO9O_OrXEjdQi8SJ1os1iK2iU9qE",
    authDomain: "react-chat-demo-3d8bd.firebaseapp.com",
    projectId: "react-chat-demo-3d8bd",
    storageBucket: "react-chat-demo-3d8bd.appspot.com",
    messagingSenderId: "457269039308",
    appId: "1:457269039308:web:13a9365545c9ee54d77269"
})

const db = firebaseApp.firestore()

export { db }
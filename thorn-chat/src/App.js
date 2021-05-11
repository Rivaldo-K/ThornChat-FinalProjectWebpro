import React, { useState, useEffect } from 'react';
// Components
import Button from './components/Button';
// Firebasedeps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBtKnbRa2b021dcDv_pTjHUOy-YqujtZTc",
  authDomain: "thorn-chat-ea7ef.firebaseapp.com",
  projectId: "thorn-chat-ea7ef",
  storageBucket: "thorn-chat-ea7ef.appspot.com",
  messagingSenderId: "918193578250",
  appId: "1:918193578250:web:66d3596e8a31b4f78a5af3"
});

const auth = firebase.auth();

function App() {
const [user, setUser] = useState(() => auth.currentUser);

  const signInWithGoogle = async () => {
    // retrive google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // set language to default browser preference
    auth.useDeviceLanguage();
    //start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
}

export default App;

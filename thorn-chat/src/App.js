import React, { useState, useEffect } from 'react';
// Components
import Button from './components/Button';
// Firebasedeps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Channel from './components/Channel';
import { useAuthState, useDarkMode } from './components/hooks';

firebase.initializeApp({
  apiKey: "AIzaSyBtKnbRa2b021dcDv_pTjHUOy-YqujtZTc",
  authDomain: "thorn-chat-ea7ef.firebaseapp.com",
  projectId: "thorn-chat-ea7ef",
  storageBucket: "thorn-chat-ea7ef.appspot.com",
  messagingSenderId: "918193578250",
  appId: "1:918193578250:web:66d3596e8a31b4f78a5af3"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setinitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setinitializing(false);
      }
    })

    // cleanup subscription
    return unsubscribe
  }, []);

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
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading ...";

  return (
    <div>
      {user ? (
        <>
          <Button onClick={signOut}>Sign out</Button>
          <Channel user={user} db={db} />
        </>
    ) : (
      <Button onClick={signInWithGoogle}>Sign in with google</Button>
    )}
    </div>
  );
}

export default App;

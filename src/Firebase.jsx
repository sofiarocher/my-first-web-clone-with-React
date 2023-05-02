import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBaANzCjbpsuhacesoAKmaO8zI-rKe6HlY",
    authDomain: "clone-tesla-de542.firebaseapp.com",
    projectId: "clone-tesla-de542",
    storageBucket: "clone-tesla-de542.appspot.com",
    messagingSenderId: "259886469150",
    appId: "1:259886469150:web:d6f1801cede70f1914de0f"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebaseApp.auth()

  export {auth}
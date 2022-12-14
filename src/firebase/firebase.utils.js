import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB4UvzeUPgiBkkD69HZgm99fGVf5sdsa_E",
    authDomain: "crwn-db-bfb0a.firebaseapp.com",
    databaseURL: "https://crwn-db-bfb0a.firebaseio.com",
    projectId: "crwn-db-bfb0a",
    storageBucket: "crwn-db-bfb0a.appspot.com",
    messagingSenderId: "23778082573",
    appId: "1:23778082573:web:b6340933e1c32ece9cfa44",
    measurementId: "G-M7DV3RFCLP"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
    
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
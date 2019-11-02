import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDKQ2DuPTwye23zK49Sw3_55uw9xBqVICA",
    authDomain: "react-todo-bf65a.firebaseapp.com",
    databaseURL: "https://react-todo-bf65a.firebaseio.com",
    projectId: "react-todo-bf65a",
    storageBucket: "react-todo-bf65a.appspot.com",
    messagingSenderId: "976266127433",
    appId: "1:976266127433:web:7dc2e60f78d0727cc97798"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log(additionalData)

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

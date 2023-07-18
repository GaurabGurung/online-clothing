import { initializeApp } from 'firebase/app'
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCwBTxsMM1jQNECBeSsK3r-941KH7RRyu8",
    authDomain: "gaurab-clothing.firebaseapp.com",
    projectId: "gaurab-clothing",
    storageBucket: "gaurab-clothing.appspot.com",
    messagingSenderId: "737603675248",
    appId: "1:737603675248:web:dabae686f38cd297be80b5"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect (auth, googleProvider)


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log ('error creating the user', error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
 export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return  signInWithEmailAndPassword (auth, email, password);
 }
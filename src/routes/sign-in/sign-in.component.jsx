import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'

const SignIn = () => {


    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef  = await createUserDocumentFromAuth(user);
    }


    return (
        <div>
            <h1> Welcome to Sign In Page</h1>
            <button onClick={logGoogleUser}> Sign in With Google popup </button> <br/>
        </div>
    )
}

export default SignIn;
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
const SignIn = () => {
    const logGoogleUser = () => async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1> Welcome to Sign In Page</h1>
            <button onClick={logGoogleUser()}>
                Sign in With Google account
            </button>
        </div>
    )
}

export default SignIn;
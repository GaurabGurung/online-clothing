import { useState } from 'react';
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-in-form.styles.scss'
import { auth, signInWithGooglePopup, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {


    
    const [formFields, setFromFields ] = useState(defaultFormFields);
    const {email,  password }= formFields;

const resetFormFields = () => {
    setFromFields(defaultFormFields);
}

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }


    const handleChange = (event)=>{
        const {name, value} = event.target;

        setFromFields({...formFields, [name]: value})
    }


    const handleSubmit = async (event)=> {
        event.preventDefault();


        try {
            const response = await signInAuthUserWithEmailAndPassword ( email, password ) ;
            console.log (response);
            resetFormFields();

        } catch (error) {
            switch (error.code){
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert ('User not found');
                    break;
                default:
                    console.log(error);
            }

        }
    }

    return(
        <div className='sign-in-container'>
            <h2>Already have an Account?</h2>
            <span>Sign in with your email and password </span>
                <form onSubmit= {handleSubmit}>
                <FormInput 
                    type="email" 
                    name= 'email' 
                    required 
                    label= 'Email'
                    value= {email}
                    onChange={handleChange}
                />

                <FormInput 
                    type="password" 
                    name= 'password' 
                    required 
                    label= 'Password'
                    value= {password}
                    onChange={handleChange}
                />

                <div className='buttons-container'>
                    <Button 
                        type= 'submit' 
                    > Sign In</Button>
                    <Button 
                        type = 'button'
                        onClick = {signInWithGoogle}
                        buttonType= 'google' 
                    > Google Sign In </Button>
                </div>

                </form>

        </div>

    )
}

export default SignInForm;
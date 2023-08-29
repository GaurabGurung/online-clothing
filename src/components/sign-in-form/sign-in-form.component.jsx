import Button from '../button/button.component';
import { useState } from 'react';
import {  signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup , } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {


    const [ formFields , setFormFields ] = useState (defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
   }

    const handleSubmit = async (event)=> {
        event.preventDefault();

        try {
            const {user}= await signInAuthUserWithEmailAndPassword (email, password);
            resetFormFields ();
            
               }catch(error){
                    switch (error.code) {
                    case 'auth/user-not-found' : 
                            alert('User not found');
                            break;
                        
                        case 'auth/wrong-password' :
                            alert (' Wrong Password');
                            break;

                        default:
                            console.log(error)    
                }
            }
        };

        const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    };

    return (
        <div className='sign-in-container'>
            <h2> Already have an account?</h2>
            <span> Sign in with your email and password </span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    type= "email" 
                    name='email'
                    required       
                    label= 'Email'
                    onChange={ handleChange }
                    value = {email}
                />
                <FormInput
                    type= "password" 
                    name='password'
                    required
                    label= 'Password' 
                    onChange={ handleChange }  
                    value = {password} 
                />
                <div className='buttons-container'>
                    < Button type = 'submit'>
                        Sign in
                    </Button>
                    <Button 
                        type = 'button'
                        onClick= {signInWithGoogle}
                        buttonType='google'
                    > Google sign in 
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;
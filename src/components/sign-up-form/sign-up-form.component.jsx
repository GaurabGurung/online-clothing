import { useState} from 'react';
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
import Button from '../button/button.component';
const SignUpForm = () => {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFromFields ] = useState(defaultFormFields);
    const {displayName, email,  password, confirmPassword }= formFields;

    const handleChange = (event)=>{
        const {name, value} = event.target;

        setFromFields({...formFields, [name]: value})
    }


    const handleSubmit = async (event)=> {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert ('Password does not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName})
            await setFromFields(defaultFormFields);
        } catch (error) {

            if (error.code === 'auth/email-already-in-use'){
                alert ('Email already in use')
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <form onSubmit= {handleSubmit} >
                <FormInput 
                    label= 'Display Name'
                    type= 'text' 
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}/> 

                <FormInput 
                    label= 'Email'
                    type= 'email'  
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}/> 

                <FormInput
                    label= 'Password'
                    type = 'password' 
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}/> 

                <FormInput
                    label= 'Confirm Password' 
                    type = 'password' 
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}/> 

                <Button 
                    buttonType={'goole'} 
                    type="submit"> Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;
import { useState} from 'react';
import { createUserAuthWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
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

        const response = await createUserAuthWithEmailAndPassword(email, password);
        console.log(response);
    }
//.........................
// const logGoogleUser = async () => {
//     const {user} = await signInWithGooglePopup();
//     const userDocRef  = await createUserDocumentFromAuth(user);
// }
//........................


    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit= {handleSubmit} >
                <label > Display Name</label>
                <input 
                    placeholder="Full Name" 
                    type= 'text' 
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}/> <br />

                <label> Email </label>
                <input 
                    type= 'email'  
                    placeholder="Email address"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}/> <br />

                <label> Password </label>
                <input 
                    type = 'password' 
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}/> <br />

                <label> Confirm Password </label>
                <input 
                    type = 'password' 
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}/> <br />

                <button 
                type="submit"> Sign Up </button>
            </form>
        </div>
    )
}

export default SignUpForm;
import React from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:'',

        }
    }

    handleSubmit = event  => {
        event.preventDefault()
        this.setState({ email: '', password: '' })
    }

    handleChange = event  => {
        const { value , name } = event.target
        this.setState({ [name]: value })
    }
    
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        label="Email"
                        type="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        required 
                    />
                    <FormInput 
                        name="password" 
                        type="password"
                        label="Password"
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        required 
                    />
                    <div className='buttons'>
                        <CustomButton 
                            type="submit" 
                            name="" 
                            id="" 
                            value="Submit Form"
                            handleChange={this.handleChange}
                        >Sign in </CustomButton>
                        <CustomButton 
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                            name="" 
                            id="" 
                            value="Submit Form"
                            handleChange={this.handleChange}
                        >Sign in with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
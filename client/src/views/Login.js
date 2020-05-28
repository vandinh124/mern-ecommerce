import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import RegistrationForm from '../components/RegistrationForm';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';



export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);

    function handleSubmit(e){
        e.preventDefault();
        setError('');
        axios.post('http://localhost:8000/api/users/login',{
            email, 
            password
        },{ withCredentials: true })
            .then(()=> navigate ('/products'))
            .catch(() => setError('Please check your credentials'));         
            
    }
    return (
        <>
            <div className = "login">
            {error && (
                <p style = {{color: 'red'}}>{error}</p>
            )}
            
           
           <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h5 text-center mb-4">Sign in</p>
                        <div className="grey-text">
                        <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                            success="right" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <MDBInput label="Type your password" icon="lock" group type="password" validate
                            name="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="text-center">
                        <MDBBtn type="submit">Login</MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer> 
            </div>
            <div className="register">

                <RegistrationForm />
            </div>
        </>
    )
}
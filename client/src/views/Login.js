import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import RegistrationForm from '../components/RegistrationForm';

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
            <h1>Login</h1>
            {error && (
                <p style = {{color: 'red'}}>{error}</p>
            )}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 

                        name="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}>                        
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}>                        
                    </input>
                </div>
                <button>Submit</button>
            </form>
            <RegistrationForm />
        </>
    )
}
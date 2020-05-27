
import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default function RegistrationForm(){

    const [errors, setErrors] = useState([]);
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleChange(event){
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        setErrors([]);
        axios.post('http://localhost:8000/api/users',formState, {
            withCredentials: true
        })
        .then(()=> navigate('/products'))
        .catch(err => {
            const errs = [];
            const innerErrorObj = err.response.data.errors;

            for(const key in innerErrorObj){
                errs.push(innerErrorObj[key].message);
            }
            setErrors(errs);
        })
    }
    return (
        <>
            <h1>Registration</h1>
            {errors.map((error, i)=> (
            <p key={i} style={{color: 'red'}}>{error}</p>
            ))}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input 
                        name = "firstName"
                        value = {formState.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input 
                        name = "lastName"
                        value = {formState.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        name = "email"
                        value = {formState.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type = "password"
                        name = "password"
                        value = {formState.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input 
                        type = "password"
                        name = "confirmPassword"
                        value = {formState.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}
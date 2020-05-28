import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';



export default function RegistrationForm(){

    const [errors, setErrors] = useState([]);
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            console.log(innerErrorObj)
            for(const key in innerErrorObj){
                //remove properties before.message if validator do not show
                errs.push(innerErrorObj[key].properties.message);
                
            }
            setErrors(errs);
        })
    }
    
    return (
        <>
            {errors.map((error, i)=> (
                <p key={i} style={{color: 'red'}}>{error}</p>
            ))}       
        
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h5 text-center mb-4">Sign up</p>
                        <div className="grey-text">
                            <MDBInput label="Your firstName" icon="user" group type="text" validate error="wrong" success="right" 
                                name = "firstName"
                                value = {formState.firstName}
                                onChange={handleChange}/>
                            <MDBInput label="Your lastName" icon="user" group type="text" validate error="wrong"
                                success="right" name = "lastName"
                                value = {formState.lastName}
                                onChange={handleChange}/>
                            <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                success="right" name = "email"
                                value = {formState.email}
                                onChange={handleChange}/>
                            <MDBInput label="Your password" icon="lock" group type="password" validate name = "password"
                                value = {formState.password}
                                onChange={handleChange} />
                            <MDBInput label="Your Confirme password" icon="lock" group type="password" validate name = "confirmPassword"
                                value = {formState.confirmPassword}
                                onChange={handleChange} />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit"color="primary">Register</MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                 </MDBRow>
            </MDBContainer>

        </>
    ) 

}

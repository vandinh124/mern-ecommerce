import React, { useState } from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

export default function ProductForm({product, method, url, redirectUrl}) {
    const [name, setName] = useState(product.name); 
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    
    

    const [errors, setErrors] = useState([]);

   

    function onSubmitHandler (e) {
        e.preventDefault();
        setErrors([]);
        axios[method](url,{            
            name,
            description, 
            category,
            imageUrl,
            quantity,
            price
        })
            .then(() => navigate('/products'))
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
            {errors.map((error, i)=> (
                <p key={i} style={{color: 'red'}}>{error}</p>
            ))}
            <form onSubmit={onSubmitHandler}>
                <div>
                    <p>Product name</p>
                    <input 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange = {e=>setName(e.target.value)}/>
                    <p>Description</p>
                    <input 
                        type="text" 
                        name="description" 
                        value={description} 
                        onChange = {e=>setDescription(e.target.value)}/>

                    <p>Image URL</p>
                    <input
                        name="imageUrl"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}/>

                    <p>Price</p>
                    <input 
                        type="number" 
                        name="price" 
                        value={price} 
                        onChange = {e => setPrice(e.target.value)}/>
                    
                    <p>Quantity</p>
                    <input 
                        type="number" 
                        name="quantity" 
                        value={quantity} 
                        onChange = {e=>setQuantity(e.target.value)}/>
                </div>
                <div>
                    <p>Category:</p>
                    <select value={category} onChange={ e => setCategory(e.target.value)}>
                        {/* <option value="" >Choose a postion</option> */}
                        <option value="Book">Book</option>
                        <option value="Food">Food</option>
                        {/* <option value="Quater Master">Quater Master</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>                         */}
                    </select><br/>

                   
                </div>
                <button>Submit</button>{'   '}
                <button type="button" onClick={() => navigate(redirectUrl)}>Cancel</button>
            </form>
        </>
    )
}

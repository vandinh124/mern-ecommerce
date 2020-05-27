import React from 'react';
import ProductForm from '../components/ProductForm';
import {navigate} from '@reach/router';

export default function NewProduct() {
    const newProduct = {
        name: '',
        description: '', 
        category: '',
        imageUrl: '',
        quantity: '',
        price: ''
        };
        
    return (
        <div>
            <h1>Add Product</h1>
            <button type="button" onClick={() => navigate("/products")}>DashBoard</button>
            <ProductForm
                product = {newProduct}
                method = "post"
                url = "http://localhost:8000/api/products"
                redirectUrl="/products"
                />
        </div>
    )

}
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductForm from '../components/ProductForm';

export default function UpdateProduct({id}) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + id)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(console.log)
    }, [id])


    if(loading) return 'Loading...';

    return (
        <div>
            <h1>Update Author</h1>
            <ProductForm 
                product = {product}
                method = "put"
                url = {"http://localhost:8000/api/products/"+id}
                redirectUrl={"/products/"+id}
            />
        </div>
    )
}

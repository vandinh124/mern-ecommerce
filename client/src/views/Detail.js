import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { navigate} from '@reach/router';


export default ({id}) => {
    const [product, setProduct] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/products/' + id)
            .then(res=>setProduct(res.data))
    },[id])


    if (product===null) return 'Loading...';
    return ( 
            <div>
                <button type="button" onClick={() => navigate("/products")}>Product Information</button>
                <h1>{product.name}</h1>
                <img src={product.imageUrl} alt={product.name} width="300" height="300"/>  

                <h2>About</h2>
                <p>Description: {product.description}</p>
                <p>Category: {product.category}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
            </div>           

    )
}
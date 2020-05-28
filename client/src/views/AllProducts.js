import React, { useState, useEffect } from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    // const [hasError, setHasError] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products',{
            withCredentials: true
        })
            .then(res => setProducts(res.data))
            // .catch(() => setHasError(true))
            .catch(() => navigate('/login'))
    }, []);


    function handleDelete(id){
        axios.delete('http://localhost:8000/api/products/' + id)
        .then(() => setProducts(products.filter(product => product._id !== id)))
    }

    // if(hasError) return 'Something went wrong';      

    if(products === null) return "Loading";

    return (
        <>
        <LogoutButton />
        <div>            
            <h1>Products Pages </h1>
            <button type="button" onClick={() => navigate("/product/new")}>Add Product</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td><Link to={"/product/" + product._id}><img src={product.imageUrl} alt={product.name} width="100" height="100"/> </Link></td>
                            <td><h3>{product.name}</h3></td>
                            
                            <td>
                                <button onClick={() => navigate('/product/' + product._id )}>View Product</button>{'   '}
                                
                                {/* <button onClick={() => handleDelete(product._id)}>Delete</button>
                                <button onClick={() => navigate('/product/' + product._id + '/edit'  )}>Edit</button> */}
                                
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </>
    )
}
import React from 'react';
import './App.css';
import AllProducts from './views/AllProducts';
import NewProduct from './views/NewProduct';
import Detail from './views/Detail';
import Login from './views/Login';
import {Router, Redirect} from '@reach/router';
import UpdateProduct from './views/UpdateProduct';




function App() {
  return (
    <div className="App">
        <Router>
            <Login path="login" />
            <AllProducts path="products" />
            <NewProduct path="product/new" />
            <Detail path="product/:id"/>
            <UpdateProduct path="product/:id/edit"/>
            <Redirect
          from="/"
          to="/products"
          noThrow
        />
        </Router>
        

    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://mobile-fair.herokuapp.com/products")
            .then(response => response.json())
            .then(data => setProducts(data))
    },[])
    console.log(products)
    return (
        <div className="row justify-content-around">
            {products.length === 0 && 
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden"></span>
            </div>}
            {products.map(product => <Product product={product}></Product>)}
        </div>
    );
};

export default Home;
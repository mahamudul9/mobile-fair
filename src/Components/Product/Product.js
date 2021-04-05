import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = ({product}) => {
    return (
        <div className='col-md-4'>
            <div className='product-card'>
                <div>
                <img style={{ height: '300px'}} src={product.image} alt=""/>
                <h4>{product.name}</h4>
                </div>
                <div className='d-flex justify-content-around'>
                    <h5>{product.price}</h5>
                    <h5>{product.storage}</h5>
                    <Link to={'/checkout/'+product._id}><button className='btn btn-success'>Buy Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
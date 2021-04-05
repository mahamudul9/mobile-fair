import React, { useEffect, useState } from 'react';
import Admin from '../Admin/Admin';
import './ManageProduct.css';
import deleteIcon from '../../icons/Group 33150.png'
import editIcon from '../../icons/Group 307.png'

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://mobile-fair.herokuapp.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    console.log(products)

    const handleDelete = (id) => {
        fetch('https://mobile-fair.herokuapp.com/delete/' + id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log("deleted:" ,res));
        
        fetch('https://mobile-fair.herokuapp.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        
    }
    return (
        <div className="d-flex row">
            <div className="col-md-4"><Admin /></div>
            <div className="col-md-8  user-table">
                <table style={{textAlign:'center'}}>
                    <tr style={{backgroundColor:'#009933', color:'white'}}>
                        <th>Name</th>
                        <th>Storage</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    {products.map(product =>
                        <tr style={{ backgroundColor: '#a6a6a6', color:'white'}} key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.storage}</td>
                            <td>{product.price}</td>
                            <td><img style={{ height: '50px', padding: '5px', cursor: 'not-allowed' }} src={editIcon} /><img style={{ height: '50px', padding: '5px', cursor: 'pointer' }} src={deleteIcon} onClick={() => handleDelete(product._id)} /></td>
                        </tr>)}
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;
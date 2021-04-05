import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Checkout.css'

const Checkout = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    console.log("User: ",loggedinUser);
    let {id}=useParams();
    const [products, setProducts]= useState([]);
    const newProduct= products.find(product =>product._id===id);
    console.log(newProduct);
    useEffect(() => {
        fetch('https://mobile-fair.herokuapp.com/products')
        .then(response =>response.json())
        .then(data =>setProducts(data))
    },[])
    
    const handleCheckout = ()=>{
        const newUser={
            mail: loggedinUser.email, 
            name: loggedinUser.name,
            date: new Date(),
            product: newProduct?.name,
            price: newProduct?.price
        }
        
        fetch('https://mobile-fair.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data =>console.log("Order Info: ",data))

        alert("Your checkout is confirmed. Visit order section to see your orders")
    }
    // console.log(user);

    
    return (
        <div>
            <h1>Checkout</h1>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td><b>{newProduct?.name}</b></td>
                    <td><b>1</b></td>
                    <td><b>{newProduct?.price}</b></td>
                </tr>
                <tr>
                    <tf><b>Total</b></tf>
                    <td style={{border:'none'}}></td>
                    <tf><b>{newProduct?.price}</b></tf>
                </tr>
                <br></br>
                <tr>
                <td style={{border:'none'}}></td>
                <td style={{border:'none'}}></td>
                <tf><button className='btn btn-success' onClick={handleCheckout}>Checkout</button></tf>
                </tr>
            </table>
        </div>
    );
};

export default Checkout;
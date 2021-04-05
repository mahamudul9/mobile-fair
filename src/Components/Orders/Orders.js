import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Orders.css'

const Orders = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    console.log(loggedinUser)
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('https://mobile-fair.herokuapp.com/orders')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])
    let newUsers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].mail === loggedinUser.email) {
            newUsers[i] = users[i];
        }
    }
    
    const newArray = newUsers.filter(value => Object.keys(value).length !== 0);
    console.log(newArray);
    return (
        <div>
            <div className="text-center">
                {newUsers.length === 0 &&
                    <div class="spinner-border text-success " role="status">
                        <span class="visually-hidden"></span>
                    </div>}
            </div>
            <br/>
            <h1>Hi {newArray[0]?.name}! You have {newArray.length} orders</h1>
            <table>
                <tr style={{ backgroundColor: '#29a329', color:'white'}}>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>
                </tr>
                {newArray.map(user =>
                    <tr style={{ backgroundColor: '#a6a6a6', color:'white'}}>
                        <td>{user.product}</td>
                        <td>1</td>
                        <td>{user.price}</td>
                        <td>{user.date}</td>
                    </tr>
                )}

            </table>
        </div>
    );
};

export default Orders;
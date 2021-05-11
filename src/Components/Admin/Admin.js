import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Admin.css'

const Admin = () => {
    const [admin, setAdmin] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.email);
    useEffect(() => {
        fetch('https://mobile-fair.herokuapp.com/admins')
            .then(res => res.json())
            .then(data => setAdmin(data))
    }, [])
    console.log("Admin: ", admin)
    const isAdmin = admin.find(data => data.email === loggedInUser.email)
    console.log("Got admin: ", isAdmin)
    return (
        <div>
            {isAdmin &&
                <div className="nav">
                    <ul>
                        <Link to="manage">Manage Product</Link>
                        <Link to="add">Add Product</Link>
                        <Link to="edit">Edit Product</Link>
                    </ul>
                </div>
            }
            <div className='text-center'>
                <h1>Sorry! you are not admin. You can't see admin section</h1>
            </div>

        </div>

    );
};

export default Admin;
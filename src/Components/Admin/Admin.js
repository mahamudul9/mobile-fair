import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'

const Admin = () => {
    return (
            <div className="nav">
                <ul>
                    <Link to="manage">Manage Product</Link> 
                    <Link to="add">Add Product</Link>
                    <Link to="edit">Edit Product</Link>
                </ul>
            </div>
    );
};

export default Admin;
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const Header = (props) => {
    console.log(props.loggedinUser);
    const { loggedinUser } = props;

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid navtag">
                <a class="navbar-brand">MOBILE FAIR</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div class="navbar-nav ">
                            <Link to='/home'  >Home</Link>
                            <Link to='/orders'  >Orders</Link>
                            <Link to='/admin' >Admin</Link>
                            <Link to='/deals' >Deals</Link>
                            <Link to='/login'><button className='btn btn-success'>{loggedinUser.isSigned ? loggedinUser.name : 'Login'}</button></Link>
                        </div>
                    
                </div>
            </div>
        </nav>

    );
};

export default Header;
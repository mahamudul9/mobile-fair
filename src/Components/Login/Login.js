import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css';
import { useForm } from "react-hook-form";
import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import icon from '../../icons/Group 573.png'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


const Login = () => {
  const [login, setLogin] = useState(false);
  const [loggedinUser, setLoggedinUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //creating user
  const [users, setUsers] = useState({
    isSigned: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  //Sign up User
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login && users.email && users.password) {
      console.log("signed up");
      firebase.auth().createUserWithEmailAndPassword(users.email, users.password)
        .then(res => {
          const newUsers = { ...users };
          newUsers.success = true;
          newUsers.error = '';
          setUsers(newUsers);
          setLoggedinUser(newUsers);
          console.log(users.name);
          updateUserName(users.name);
          setLogin(true);
        })
        .catch((error) => {
          const newUsers = { ...users }
          newUsers.error = error.message;
          newUsers.success = false;
          setUsers(newUsers);
          setLoggedinUser(newUsers);
          console.log(error.message)
        });
    }
    // e.preventDefault();

    //Sign in user with email
    if (login && users.email && users.password) {
      console.log("logged in");
      firebase.auth().signInWithEmailAndPassword(users.email, users.password)
        .then((res) => {
          const newUsers = { ...users };
          newUsers.success = true;
          newUsers.error = '';
          setUsers(newUsers);
          setLoggedinUser(newUsers);
          history.replace(from);
          console.log('Sign in User info: ', res.user)
        })
        .catch((error) => {
          const newUsers = { ...users }
          newUsers.error = error.message;
          newUsers.success = false;
          setLoggedinUser(newUsers);
          setUsers(newUsers);
          console.log(error.message)
        });
    }
    e.preventDefault();
  }

  //updating username
  const updateUserName = (name) => {
    console.log(name);
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    })
      .then(() => {
        console.log('Update successful')
      }).catch(error => {
        console.log('An error happened')
      });
  }

  //handling email and password
  const handleBlur = (event) => {
    let checkValid = true;
    if (event.target.name === 'email') {
      checkValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      checkValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(event.target.value);
    }
    if (checkValid) {
      const newUsers = { ...users };
      newUsers[event.target.name] = event.target.value;
      setUsers(newUsers);
    }
  }

  //google signin
  const handleGoogle = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUsers(signedInUser);
        setLoggedinUser(signedInUser);
        console.log(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, '\n', errorMessage)
      });
  }


  return (
    <div className='login'>
      {!login && <div className='login-main'>
         <form onSubmit={handleSubmit} className='login-form'>
          <h3>Create an account</h3>
          <input name="name" type='text' placeholder='Name' onBlur={handleBlur} required />
          <br></br>
          <input name="email" type='email' placeholder='Email' onBlur={handleBlur} required />
          <br></br>
          <input name="password" type='password' placeholder='Password' onBlur={handleBlur} title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required />
          <br></br>
          <input className='submit' type="submit" value='Create an account' />
          <p>Already have an account? <span onClick={() => setLogin(true)} style={{ color: '#009933' }}>Login</span></p>
        </form>
      </div>}
      {login && <div className='login-main'>
         <form onSubmit={handleSubmit} className='login-form'>
          <h3>Login</h3>
          <input name="email" type='email' onBlur={handleBlur} placeholder='Email' required />
          <br></br>
          <input name="password" type='password' onBlur={handleBlur} placeholder='Password' required />
          <br></br>
          <input className='submit' type="submit" value='Login' />
          <p>Don't have account? <span onClick={() => setLogin(false)} style={{ color: '#009933' }}>Create an accoumt</span></p>
        </form>
        </div>}
        <br></br>
        <p>---------- Or ------------</p>
        <button className='btn google' onClick={handleGoogle}><img style={{width: '20px'}} src={icon} alt="" />  Continue with Google</button>
    </div>
  );
};
export default Login;
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import NotFound from './Components/NotFound/NotFound';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ManageProduct from './Components/ManageProduct/ManageProduct';
import Orders from './Components/Orders/Orders';
import Deals from './Components/Deals/Deals';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import Checkout from './Components/Checkout/Checkout';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


export const UserContext = createContext();

function App() {
  const[loggedinUser, setLoggedinUser] = useState({});
  
  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
    <Router>
    <Header loggedinUser={loggedinUser}></Header>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <PrivateRoute path='/edit'>
          <EditProduct/>
        </PrivateRoute>
        <PrivateRoute path='/orders'>
          <Orders/>
        </PrivateRoute>
        <PrivateRoute path='/admin'>
          <ManageProduct/>
        </PrivateRoute>
        <PrivateRoute path='/manage'>
          <ManageProduct/>
        </PrivateRoute>
        <PrivateRoute path='/add'>
          <AddProduct/>
        </PrivateRoute>
        <Route path='/deals'>
          <Deals/>
        </Route>
        <PrivateRoute path='/checkout/:id'>
          <Checkout/>
        </PrivateRoute>
        <Route path='*'>
            <NotFound/>
          </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

import React, { Component } from 'react'
import Login from './auth/Login';
import Register from './auth/Register';
import { Link } from 'react-router-dom';
import header from '../images/n1.jpg';
import axios from 'axios';
import cookies from 'cookies-js';

class Header extends Component {


  constructor() {
    super();
     this.logOut = this.logOut.bind(this);
  }

  logOut() {
      let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };
    axios
      .delete('http://localhost:3000/auth/sign_out', {
        headers: headers
      })
      .then(res => {
        console.log(res.data);
      }).catch(err => console.log(err));

  }

    render() {
        return(
            <div className='navBar'>


                    <div className="title_logo">
                    <img src={header}  height="150px" width="300px" />
                    </div>

                    <div className="nav_links">
                    <Link className="home" to='/'>Home</Link>
                    <Link className="register" to='/register'>Register</Link>
                    <Link className="login" to='/login'>Login</Link>
                    <Link className="logout" onClick={this.logOut} to='/'>Logout</Link>
                    </div>


            </div>

        )
    }
}

export default Header;

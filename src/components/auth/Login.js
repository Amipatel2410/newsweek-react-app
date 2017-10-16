import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';
import loginimage from '../../images/newsl1.jpg';

class Login extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            fireRedirect: false,
            auth: false,
            userId:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        //this.handleDeleteuser = this.handleDeleteuser.bind(this);
 }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleFormSubmit(e) {
      e.preventDefault();
      axios
        .post('http://localhost:3000/auth/sign_in', {
            email: this.state.email,
            password: this.state.password,
        })
        .then(res => {
          //setting cookies here
          cookies.set('access-token', res.headers["access-token"]);
          cookies.set('client', res.headers["client"]);
          cookies.set('token-type', res.headers["token-type"]);
          cookies.set('uid', res.headers["uid"]);
          cookies.set('expiry', res.headers["expiry"]);
          cookies.set('user_id', res.data.data.id);

          console.log(res, 'this is res');

          if(res.data.data.email) {
            this.setState({
              auth: true,
              fireRedirect: true,
              userId: res.data.data.id,
            });
            // this.props.onLogin({
            //   accessToken: res.headers["access-token"],
            //   client: res.headers["client"],
            //   tokenType: res.headers["token-type"],
            //   uid: res.headers["uid"],
            //   expiry: res.headers["expiry"]
            // })
            console.log(this.state,'this is the state')
          }
        })
        .catch(err => console.log(err));
        e.target.reset();
    }

    // handleDeleteuser(e) {
    //   axios.delete('http://localhost:3000/auth/sign_out')
    //       .then(res => {
    //         console.log(res);
    //         this.setState({
    //           fireRedirect: true,
    //         });
    //       }).catch(err => {
    //         console.log(err);
    //       });
    // }




        render(){

        return(
            <div className='login_page'>

                <img src ={loginimage} height="250px" width="250px" />
                <form className="login-form" onSubmit={(e) => this.handleFormSubmit(e)}>
                  <label>
                  Enter your Email Address <br/>
                    <input className="form-input" type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.handleInputChange}></input>
                  </label>
                  <br />
                  <label>
                  Enter Your Password <br />
                    <input className="form-input"  type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleInputChange}></input>
                  </label>
                  <br />
                    <button className="btn" type='submit'>Login</button>
                </form>



                {this.state.fireRedirect
          ? <Redirect push to={`/UserProfile/${this.state.userId}`} />
          : ''}
            </div>


        )
    }
}

export default Login;

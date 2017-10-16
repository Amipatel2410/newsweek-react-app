import React, {Component} from 'react';
import axios from 'axios';
import registerimage from '../../images/newsr1.jpg';

import { withRouter } from 'react-router';
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            email: '',
            password: '',
        };

        window.h = props.history;


        console.log(props.history);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
        // axios
        //     .post('http://localhost:3000/auth', {
        //         username: this.state.username,
        //         email: this.state.email,
        //         password: this.state.password,
        //         confirm_success_url: 'www.google.com'
        //     })
        //     .then(res => {
        //         this.props.history.push('/login', {});
        //     })
        //     .catch(err => console.log(err));
        // e.target.reset();

         let fb = {
//              "name": this.state.name,
              "email": this.state.email,
              "password": this.state.password,
//              "password_confirmation": this.state.passwordConfirmation,
              "confirm_success_url": 'www.google.com'
//              "confirm_success_url": 'http://localhost:3000/confirm_success'
    }
    console.log('fb = ',fb);
    axios('http://localhost:3000/auth', {
      method: 'POST',
      header: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: fb
    })
    .then(res => {
      console.log(res)
    })
    .then(json => {
      console.log(json,'<-----')
      console.log(document.cookie)
    })
    .catch(err => console.log(err));

    }

    render() {
        return (
            <div className='register_page'>

              <img src={registerimage} height="250px" width="250px" />
                <form className="login-form" onSubmit={this.handleFormSubmit}>
                  <label>
                  Enter Your Username <br />
                    <input  className="form-input" type="text" name='username' placeholder='username' value={this.state.username}onChange={this.handleInputChange}></input>
                    </label> <br/>
                    <label>
                    Enter Your Email Id <br/>
                    <input  className="form-input" type="text" name='email' placeholder='email' value={this.state.email}onChange={this.handleInputChange}></input>
                    </label> <br/>
                    <label>
                    Enter Your password <br />
                    <input  className="form-input" type="password" name='password' placeholder='password' value={this.state.password}onChange={this.handleInputChange}></input>
                    </label > <br />
                    <button className="btn" type='submit'>Register</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);

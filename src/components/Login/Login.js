import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }
  render() {
    return (<div>
      <div className="login">
        <b style={{ fontSize: '220%' }}>Please sign in.</b>
        <form onSubmit={this.props.loginSubmitHandler}>
          <input id='user' type='text' name='user' placeholder='Email or Mobile Number' onBlur={this.props.userOnChange} required />
          <input id='password' type='password' name='password' placeholder='Password' required />
          <input type="submit" value="Submit" onClick={this.props.onSubmit} />
        </form>
        <a href="#">Forgot your Apple ID or password?</a>
        <a href="#">Register Now</a>
      </div>
    </div>);
  }
}


export default Login;
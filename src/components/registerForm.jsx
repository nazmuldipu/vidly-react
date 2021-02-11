import Joi from 'joi-browser';
import React from 'react';
import * as userService from '../services/userService';
import auth from '../services/authService';

import Form from './common/form';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  shema = {
    name: Joi.string().required().min(6).label('Name'),
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(6).label('Password'),
  };

  doSubmit = async () => {
    try {
      const resp = await userService.register(this.state.data);
      auth.loginWithJwt(resp.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

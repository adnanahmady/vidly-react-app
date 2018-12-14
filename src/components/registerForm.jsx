import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as user from './../services/userService';
import auth from './../services/authService';
import Form from './common/form';

class RegisterForm extends Form {
  state = {
    data: { email: '', password: '', username: '' },
    errors: {}
  }

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    username: Joi.string().required().label('Username')
  };

  doSubmit = async () => {
    try {
      const { headers } = await user.register(this.state.data);
      auth.loginWithJwt(headers['x-auth-token']);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        if (ex.response.data.message === 'expected') {
          this.setState({ errors: ex.response.data.result });
        } else if (ex.response.data.message === 'unexpected') {
          toast.error(ex.response.data.result);
        }
      }
    }
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit}>
        <div className="card">
          <div className="card-header">
            <div className="card-title text-center">
              <h1>Register User</h1>
            </div>
          </div>
          <div className="card-body">
            <form>
              {this.renderInput(
                "Email",
                'email',
                'email'
              )}
              {this.renderInput(
                "Password",
                'password',
                'password'
              )}
              {this.renderInput(
                "Username",
                'username'
              )}
              <div className="form-group">
                {this.renderButton('Register')}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
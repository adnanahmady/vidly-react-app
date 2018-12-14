import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import auth from './../services/authService';
import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {}
  }

  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const {state} = this.props.location;
      window.location = state ? state.from : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        this.setState({ errors: ex.response.data.result });
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div onSubmit={this.handleSubmit}>
        <div className="card">
          <div className="card-header">
            <div className="card-title text-center">
              <h1>Login</h1>
            </div>
          </div>
          <div className="card-body">
            <form>
              {this.renderInput(
                "Email",
                'email'
              )}
              {this.renderInput(
                "Password",
                'password',
                'password'
              )}
              <div className="form-group">
                {this.renderButton('Login')}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
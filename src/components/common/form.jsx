import React, { Component } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  handleValidation = () => {
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });
    if (!error) return null;
    for (let item of error.details) errors[item.path] = item.message;
    
    return errors;
  }

  validateInputs = ({ name: ename, value }) => {
    const name = ename.split('.')[0]; 
    let obj = {}, schema = {};
    obj = _.set(obj, ename, value);
    schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
  }
  
  handleChange = ({ currentTarget: input }) => {
    const name = input.name.split('.')[0];
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInputs(input);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    this.setState({ errors });

    const data = { ...this.state.data };
    _.set(data, input.name, input.value);
    this.setState({ data });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.handleValidation();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  }

  renderButton = (label) => {
    return (
      <button
        disabled={this.handleValidation()}
        className="btn btn-danger btn-md"
      >
        {label}
      </button>
    );
  }

  renderInput = (label, name, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect = (label, name, columns) => {
    const { errors, data } = this.state;
    return (
      <Select
        label={label}
        name={name}
        columns={columns}
        onChange={this.handleChange}
        field={_.get(data, name)}
        error={_.get(errors, name.split('.')[0])}
      />
    );
  }
}

export default Form;
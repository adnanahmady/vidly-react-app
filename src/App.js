import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import auth from './services/authService';
import MoviesSection from './components/moviesSection';
import NavBar from './components/navbar';
import NotFound from './components/not-found';
import Customers from './components/customers';
import Rentals from './components/rentals';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {}

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="container mt-2">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} to="/login" />
            <Route path="/movies" component={MoviesSection} /> 
            <Route path="/not-found" component={NotFound} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
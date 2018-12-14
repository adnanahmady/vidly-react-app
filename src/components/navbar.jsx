import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import auth from './../services/authService';

const NavBar = () => {
  const user = auth.getCurrentUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
      <Link to="/" className="navbar-brand">Vidly</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/movies" className="nav-item nav-link">Movies</NavLink>
          <NavLink to="/customers" className="nav-item nav-link">Customers</NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
        </div>
        <div className="navbar-nav ml-auto">
          {!user &&
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
            </React.Fragment>
          }
          {user &&
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
              <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
            </React.Fragment>
          }
        </div>
      </div>
    </nav>
  );
}


export default NavBar;
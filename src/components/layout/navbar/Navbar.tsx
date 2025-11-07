import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Navbar.css';
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg  shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          E-Commerce
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
          </ul>

          {/* Right Buttons + Cart */}
          <div className="d-flex btn-login flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
            <NavLink to="/login" className="btn btn-sm">
              Login
            </NavLink>
            <NavLink to="/signup" className="btn  text-dark fw-semibold btn-sm">
              Sign Up
            </NavLink>

            {/* Sidebar (Cart) */}
            <Sidebar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

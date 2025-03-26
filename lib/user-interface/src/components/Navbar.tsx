import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  return (
    <nav className="navbar">
        {/* Link back to auth page*/}
      <div className="navbar-brand">
        <NavLink to="/auth/login">
        Claims Ingestion App
        </NavLink>
        </div>
      <ul className="navbar-links">     
        <li>
          <NavLink
            to="/upload-csv"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Upload CSV
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-charts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Charts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/past-charts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Past Charts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;

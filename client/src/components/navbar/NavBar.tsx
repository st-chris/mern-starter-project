import { NavLink } from "react-router-dom";
import './navbar.css';
import type React from "react";
import logo from '../../assets/logo.svg';

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => (
  <nav className="navbar">
    <div className="navbar-left">
      <button className="hamburger" onClick={onMenuToggle}>☰</button>
      <img src={logo} alt="Logo" className="logo" />
    </div>
    <div className="navbar-right">
      <NavLink
        to="/"
        end
        className={({ isActive }) => 
          "nav-link" + (isActive ? " active-link" : "")
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => 
          "nav-link" + (isActive ? " active-link" : "")
        }
      >
        Profile
      </NavLink>
    </div>
  </nav>
);

export default Navbar;

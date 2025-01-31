import React, { useState } from "react";
import "./Navbar.css"; // Import the custom CSS for styling
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">UI-Studio Blogs</a>
        </div>

        {/* Hamburger Menu */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="/blogs">Home</a>
          </li>

          <li>
            <Link to="/addBlog">Add Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

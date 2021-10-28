import React from "react";
import logo from "assets/icons/fpt-logo.png";
import "./styles.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <img className="footer-logo" src={logo} alt={logo} />
      </div>
    </footer>
  );
};

export default Footer;

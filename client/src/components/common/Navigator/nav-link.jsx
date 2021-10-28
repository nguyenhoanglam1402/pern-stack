import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const NavLink = ({ to, content }) => {
  return (
    <li className="navbar-item">
      <Link className="link" to={to}>
        {content}
      </Link>
    </li>
  );
};

export default NavLink;

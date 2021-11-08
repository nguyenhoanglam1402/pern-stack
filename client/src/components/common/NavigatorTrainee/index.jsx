import React from "react";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import NavLink from "../Navigator/nav-link";
import imageLogo from "assets/icons/fpt_logo.png";

const Navigator = () => {
  const store = useSelector((store) => store.authReducer);
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <div className="logo-block">
          <img className="logo" src={imageLogo} alt="" />
        </div>
        <NavLink to="../trainee/home" content="Home" />
        <NavLink to="../trainee/classes" content="Classes" />
        <NavLink to="../trainee/profile" content="Profile" />
      </ul>
      <div className="user-avatar">
        <div className="user-block">
          <div>
            <p className="username">{store.email}</p>
          </div>
          <UserOutlined className="nav-avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navigator;

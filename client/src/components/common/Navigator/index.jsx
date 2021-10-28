import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserOutlined } from "@ant-design/icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import NavLink from "./nav-link";
import imageLogo from "assets/icons/fpt-logo.png";

const Navigator = () => {
  const store = useSelector((store) => store.authReducer);
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <div className="logo-block">
          <img className="logo" src={imageLogo} alt="" />
        </div>
        <NavLink to="../admin/home" content="Home" />
        <NavLink to="../admin/course" content="Courses" />
        <NavLink to="../admin/trainee" content="Trainees" />
        <NavLink to="../admin/trainer" content="Trainers" />
      </ul>
      <div className="user-avatar">
        <div className="user-block">
          <div>
            <p className="username">{store.email}</p>
          </div>
          <UserOutlined className="nav-avatar" />;
        </div>
      </div>
    </nav>
  );
};

export default Navigator;

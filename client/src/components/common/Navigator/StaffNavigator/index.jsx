import React from "react";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import NavLink from "./nav-link";
import imageLogo from "assets/icons/fpt_logo.png";

const NavigatorStaff = () => {
  const store = useSelector((store) => store.authReducer);
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <div className="logo-block">
          <img className="logo" src={imageLogo} alt="" />
        </div>
        <NavLink to="../staff/home" content="Home" />
        <NavLink to="../staff/course" content="Courses" />
        <NavLink to="../staff/trainee" content="Trainees" />
        <NavLink to="../staff/trainer" content="Trainers" />
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

export default NavigatorStaff;

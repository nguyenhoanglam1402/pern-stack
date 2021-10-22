import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useForm } from "react-hook-form";
import { userAuthenticate } from "../../../api/index.test";
import { loginAction } from "actions/auth.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const LoginComponent = () => {
  const { register, handleSubmit } = useForm();
  const authDispatch = useDispatch();
  const store = useSelector((state) => state);
  const onLogin = (data) => {
    userAuthenticate(data)
      .then((respond) => {
        const authData = {
          uid: respond.data.data.uid,
          fullname: respond.data.data.fullname,
          email: respond.data.data.email,
          token: respond.data.token,
        };
        const authAction = loginAction(authData);
        authDispatch(authAction);
        console.log("Respond: ", respond.data);
        console.log("Redux Store: ", store);
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onLogin)} className="login-form">
        <h1 className="title-box">Sign In</h1>
        <label className="login-label">Username</label>
        <div className="input-icons">
          <FontAwesomeIcon icon={faUser} className={`field-icon icon`} />
          <input
            type="email"
            className="field"
            placeholder="Type your email"
            {...register("email")}
          />
        </div>
        <label className="login-label">Password</label>
        <div className="input-icons">
          <FontAwesomeIcon icon={faLock} className={`field-icon icon`} />
          <input
            type="password"
            className="field"
            placeholder="Type your password"
            {...register("password")}
          />
        </div>
        <button type="submit" className="button-login">
          Login
        </button>
        <p className="copyright-text">Tech Otakus save the Assignment</p>
      </form>
    </div>
  );
};

export default LoginComponent;

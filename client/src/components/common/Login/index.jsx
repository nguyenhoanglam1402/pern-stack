import React from "react";
import "./styles.css";
import { Form, Input } from "antd";
import { userAuthenticate } from "api/index.test";
import { loginAction } from "actions/auth.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginComponent = () => {
  const history = useHistory();
  const authDispatch = useDispatch();
  const store = useSelector((state) => state);

  const redirect = (role) => {
    switch (role) {
      case "Admin": {
        history.push("/admin/home");
        break;
      }
      case "Trainer": {
        history.push("/admin/home");
        break;
      }
      case "Trainee": {
        history.push("/trainee/home");
        break;
      }
      case "Staff": {
        history.push("/staff/home");
        break;
      }
      default: {
        break;
      }
    }
  };

  const onLogin = (data) => {
    console.log(data);
    userAuthenticate(data)
      .then((respond) => {
        if (respond.data.success) {
          const authData = {
            uid: respond.data.data.uid,
            fullname: respond.data.data.fullname,
            email: respond.data.data.email,
            role: respond.data.data.role,
            token: respond.data.token,
            isAuthenticated: respond.data.success,
          };
          const authAction = loginAction(authData);
          authDispatch(authAction);
          console.log("Redux Store: ", store);
          redirect(authData.role);
          localStorage.setItem("token", authData.token);
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="login-container">
      <Form className="login-form" onFinish={onLogin}>
        <h1 className="title-box">Sign In</h1>
        <label className="login-label">Username</label>
        <Form.Item name="email">
          <Input
            type="email"
            prefix={<UserOutlined className="icon" />}
            className="field"
            placeholder="Type your email"
          />
        </Form.Item>
        <label className="login-label">Password</label>
        <Form.Item name="password">
          <Input
            type="password"
            prefix={<LockOutlined className="icon" />}
            className="field"
            placeholder="Type your password"
          />
        </Form.Item>
        <button type="submit" className="button-login">
          Login
        </button>
        <p className="copyright-text">Tech Otakus save the Assignment</p>
      </Form>
    </div>
  );
};

export default LoginComponent;

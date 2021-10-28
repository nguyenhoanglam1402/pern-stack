import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = ({ component: Component, role: Role, ...rest }) => {
  const store = useSelector((state) => state);
  const isAuthenticated = store.authReducer.isAuthenticated;
  const roleRestrict = store.authReducer.role;
  return (
    <Route
      {...rest}
      component={(props) => {
        if (isAuthenticated && Role === roleRestrict) {
          return <Component />;
        }
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default ProtectRoute;

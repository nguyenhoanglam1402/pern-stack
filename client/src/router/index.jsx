import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const store = useSelector((state) => state);
  const isAuthenticated = store.authReducer.isAuthenticated;
  return (
    <Route
      {...rest}
      component={(props) => {
        if (isAuthenticated) {
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

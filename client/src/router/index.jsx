import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        if (isAuth) {
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

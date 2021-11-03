import "antd/dist/antd.css";
import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "components/Container/Staff";
import ProtectRoute from "router";

const AuthPage = React.lazy(() => import("./pages/Auth"));
const StaffContainer = React.lazy(() => import("components/Container/Staff"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading App...</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <ProtectRoute path="/admin" component={Container} role="Trainer" />
            <ProtectRoute
              path="/staff"
              component={StaffContainer}
              role="Staff"
            />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

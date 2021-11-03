import "antd/dist/antd.css";
import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectRoute from "router";
const AuthPage = React.lazy(() => import("./pages/Auth"));
const StaffContainer = React.lazy(() => import("components/Container/Staff"));
const TraineeContainer = React.lazy(() =>
  import("components/Container/Trainee")
);
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading App...</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <ProtectRoute
              path="/admin"
              role="Admin"
            />
            <ProtectRoute
              path="/staff"
              component={StaffContainer}
              role="Staff"
            />
            <ProtectRoute
              path="/trainee"
              component={TraineeContainer}
              role="Trainee"
            />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

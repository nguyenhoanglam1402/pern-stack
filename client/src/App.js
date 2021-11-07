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
const AdminContainer = React.lazy(() => import("components/Container/Admin"));
const TrainerContainer = React.lazy(() => import("components/Container/Trainer"));


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading App...</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <ProtectRoute
              path="/admin"
              component={AdminContainer}
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
            <ProtectRoute
              path="/trainer"
              component={TrainerContainer}
              role="Trainer"
            />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

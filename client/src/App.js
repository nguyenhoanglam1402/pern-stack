import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "components/common/Container";
import ProtectRoute from "router";

const AuthPage = React.lazy(() => import("./pages/Auth"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading App...</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <ProtectRoute path="/admin" component={Container} />
            <ProtectRoute path="/staff" component={Container} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

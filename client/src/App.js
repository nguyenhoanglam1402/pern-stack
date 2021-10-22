import "./App.css";
import React, { Suspense } from "react";

const LoginPage = React.lazy(() => import("./pages/Home"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading App...</div>}>
        <LoginPage />
      </Suspense>
    </div>
  );
}

export default App;

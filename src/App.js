import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// containers
import Onboarding from "./containers/Onboarding";

// styles
import "./App.scss";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Onboarding} />
    </Router>
  );
}

export default App;

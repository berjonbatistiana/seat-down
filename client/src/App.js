import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import { About, SignIn, SignUp } from "./pages/Viewer"
import { Navbar } from "./pages/common"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={About} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
}

export default App;

import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import { About, SignIn, SignUp, Directory } from "./pages/Viewer"
import {Navbar, UserNavbar} from "./pages/common"

const App = () => {
  return (
    <Router>
      <Navbar />
      <UserNavbar/>
      <Route exact path="/" component={About} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/directory" component={Directory} />
    </Router>
  );
}

export default App;

import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import { About, SignIn, SignUp, Dashboard, Directory } from "./pages/Viewer"
import {Navbar, UserNavbar} from "./pages/common"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6bd5e1",
      darker: "#5fc5d1",
    },
    secondary: {
      main: "#fd8369",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <UserNavbar/>
        <Route exact path="/" component={About} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/directory" component={Directory} />
        <Route path="/dashboard" component={Dashboard}/>
      </Router>
    </ThemeProvider>
  );
};

export default App;

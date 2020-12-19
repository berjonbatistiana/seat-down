import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { About, SignIn, SignUp, Dashboard, Directory, Reservation, AddBuilding } from "./pages/Viewer"
import {Navbar, UserNavbar} from "./pages/common"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Navbar />
          <UserNavbar/>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/directory" component={Directory}  />
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/reserve" component={Reservation} />
          <Route path="/configure" component={AddBuilding}/>
          <Route exact path="/" component={About} />
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;

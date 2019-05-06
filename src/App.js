import React, { Component } from "react";
import "./App.css";
import CustomerList from "./Components/CustomerList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Trainings from "./Components/Trainings";
import Home from "./Components/Home";
import Button from "@material-ui/core/Button";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Calendar from "./Components/Calendar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" style={{ background: "#5C6BC0" }}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Customer list
            </Typography>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <div className="Frame" style={{ marginLeft: 24 }}>
            <Link to="/customers" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }}
                variant="outlined"
              >
                Customers
              </Button>
            </Link>
            <Link to="/trainings" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }}
                variant="outlined"
              >
                Trainings
              </Button>
            </Link>
            <Link to="/calendar" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: 10, marginBottom: 10 }}
                variant="outlined"
              >
                Calendar
              </Button>
            </Link>

            <Switch>
              <Route exact path="/customers" component={CustomerList} />
              <Route path="/trainings" component={Trainings} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

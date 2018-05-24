import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Ask from "./components/Ask";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Users from "./components/Users";
import Sidebar from "./components/Sidebar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
        <div className="header">
          <h2>Karalenak Denis test task.</h2>
        </div>
         <Sidebar />
          <div className="content">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/admin" component={Admin} />
              <Route path="/profile" component={Profile} />
              <Route path="/ask" component={Ask} />
              <Route path="/users" component={Users} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
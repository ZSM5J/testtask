import React, { Component } from "react";
import {isAuthenticated, login} from "./helpers";
import {Redirect} from 'react-router-dom'
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      password: "",
      message: ""
     };

    //this.test = this.test.bind(this);
  }

  login(event) {
    event.preventDefault();
    login(this.state.username, this.state.password).end((err, res) => {
      if (res.status !== 500) {
        localStorage.setItem('username', res.body.username);
        localStorage.setItem('isAdmin', res.body.isAdmin);
        localStorage.setItem('id', res.body._id);
        setTimeout( function() { 
          this.setState({message: "Succesfully log in"})
         }.bind(this), 500);
      } else {
        this.setState({message: "bad login or password"})
        setTimeout( function() { 
          this.setState({message: ""})
         }.bind(this), 3000);
      }
    });
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event) {
    
    this.setState({password: event.target.value})
  }

 render() {
    const auth = isAuthenticated();
  return (
    <div>
      <p>Pleese login</p>
      {auth ? <Redirect to={{pathname: '/'}}/> : 
      <form onSubmit={this.login.bind(this)}>
        <input placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
        <br/>
        <input placeholder='Password' type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
        <br/>
        <button type="submit">login</button>
        <p className="message">{this.state.message}</p>
      </form>}

    </div>
  )};

};

export default Login;
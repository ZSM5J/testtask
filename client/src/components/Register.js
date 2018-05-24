import React, { Component } from "react";
import {isAuthenticated, register} from "./helpers";
import {Redirect} from 'react-router-dom'
import './Login.css';
import { Link } from 'react-router-dom';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      password: "",
      age: "",
      hobby: "",
      film: "",
      message: ""
     };

    //this.test = this.test.bind(this);
  }

  regUser(event) {
    event.preventDefault();
    register(this.state.username, this.state.password, this.state.age, this.state.hobby, this.state.film, false).end((err, res) => {
      if (res.status !== 500) {
          setTimeout( function() { 
          this.setState({message: "User with name " + this.state.username + " is created. Now you can login"})
         }.bind(this), 500);
      } else {
        this.setState({message: "user is already exist"})
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

  handleAgeChange(event) {
    this.setState({age: event.target.value})
  }

  handleHobbyChange(event) {
    this.setState({hobby: event.target.value})
  }

  handleFilmChange(event) {
    this.setState({film: event.target.value})
  }

 render() {
    const auth = isAuthenticated();
  return (
    <div>
      <p>Fill empty fields:</p>
      {auth ? <Redirect to={{pathname: '/'}}/> : 
      <form onSubmit={this.regUser.bind(this)}>
        <input placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
        <br/>
        <input placeholder='Password' type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
        <br/>
        <input placeholder='Age' type="number" min="1" max="99" value={this.state.age} onChange={this.handleAgeChange.bind(this)} />
        <br/>
        <input placeholder='Hobby' value={this.state.hobby} onChange={this.handleHobbyChange.bind(this)} />
        <br/>
        <input placeholder='Film' value={this.state.film} onChange={this.handleFilmChange.bind(this)} />
        <br/>
        <button type="submit">register</button>
        <p className="message2">{this.state.message}</p>
      </form>}

    </div>
  )};

};

export default Register;
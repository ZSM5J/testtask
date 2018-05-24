import React, { Component } from "react";
import {isAuthenticated, ask} from "./helpers";
import {Redirect} from 'react-router-dom'
import './Login.css';
import { Link } from 'react-router-dom';

class Ask extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      topic: "",
      text: "",
      message: ""
     };

  }

  ask(event) {
    event.preventDefault();
    var date = new Date();
    ask(localStorage.getItem('username'), this.state.topic, date, this.state.text, "").end((err, res) => {
      if (res.status !== 500) {
        console.log(res.body);
        setTimeout( function() { 
          this.setState({message: "Your ask has been sent to admin", topic: "", text: ""})
         }.bind(this), 100);
      } else {
        this.setState({message: "bad connection to server"})
        setTimeout( function() { 
          this.setState({message: ""})
         }.bind(this), 3000);
      }
    });
  }

  handleTopicChange(event) {
    this.setState({topic: event.target.value})
  }

  handleTextChange(event) {
    
    this.setState({text: event.target.value})
  }

 render() {
    const auth = isAuthenticated();
  return (
    <div>
      <p>Pleese login</p>
      {!auth ? <Redirect to={{pathname: '/login'}}/> : 
      <form onSubmit={this.ask.bind(this)}>
        <p>Ask anything you want</p>
        <input placeholder='Topic' value={this.state.topic} onChange={this.handleTopicChange.bind(this)} />
        <br/>
        <textarea placeholder='text' rows="10" cols="45"  value={this.state.text} onChange={this.handleTextChange.bind(this)} />
        <br/>
        <button type="submit">ask</button>
        <p className="message">{this.state.message}</p>
      </form>}

    </div>
  )};

};

export default Ask;
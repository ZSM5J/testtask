import React, { Component } from "react";
import {isAuthenticated} from "./helpers";
import {Redirect} from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
     };

    //this.test = this.test.bind(this);
  }


  componentDidMount(){
    if (isAuthenticated()) {
      this.setState({username: localStorage.getItem('username')});
    }
  }

  render() {
    const auth = isAuthenticated();
  return (
    <div>
      {!auth ? <Redirect to={{pathname: '/login'}}/> : 
      <p>Welcomm, {this.state.username} you can see your profile or ask question</p>}

    </div>
  )};

};
  
export default Home;
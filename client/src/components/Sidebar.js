import React, { Component } from "react";
import {isAuthenticated, logout, isAdmin} from "./helpers";
import { NavLink, withRouter} from 'react-router-dom'; 
import './Sidebar.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
     };

  }

  Quit() {
    logout();
     }

  render() {
    const isAuth = isAuthenticated();
    const admin = isAdmin();
    return (
      <div className="Sidebar">
        {!isAuth ? <div><NavLink to="/login" className="link">Login</NavLink>
        <NavLink to="/register" className="link">Register</NavLink></div> : null}

        {isAuth ? <div><NavLink to="/" className="link">Home</NavLink>
        <NavLink to="/ask" className="link">Ask</NavLink>
        <NavLink to="/profile" className="link" >Profile</NavLink></div> : null}

        {(isAuth && admin) ? <div><NavLink to="/users" className="link">Users</NavLink>
        <NavLink to="/admin" className="link">Admin panel</NavLink></div> : null}
        {isAuth ? <NavLink to="/login" className="link"onClick={this.Quit}>Log Out</NavLink> : null}
      </div>
    );
  
  };

}


export default Sidebar;
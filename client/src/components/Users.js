import React, { Component } from "react";
import {isAuthenticated, getUsers, deleteUser, updateUser, isAdmin} from "./helpers";
import {Redirect} from 'react-router-dom'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: "", 
          username: "",
          age: "",
          hobby: "",
          film: "",
          isAdmin: false,
          show: false,
          users:  [] };

      }

      loadUsers() {
          
          getUsers().end((err, res) => {
             this.setState({users: res.body});
        });
      }

      update() {
        updateUser(this.state.id, this.state.age, this.state.hobby, this.state.film, this.state.isAdmin).end((err, res) => {
          if (res.status !== 500) {
            console.log(res);
          } else {
            this.setState({message: "bad connect with server"})
          }
          this.loadUsers();
        });
      }

      makeAdmin() {
        updateUser(this.state.id, this.state.age, this.state.hobby, this.state.film, true).end((err, res) => {
          if (res.status !== 500) {
            console.log(res);
          } else {
            this.setState({message: "bad connect with server"})
          }
          this.loadUsers();
        });
      }

      removeUser() {
        deleteUser(this.state.id).end((err, res) => {
          if (res.status !== 500) {
            console.log(res);
          } else {
            this.setState({message: "bad connect with server"})
          }
          this.loadUsers();
          this.setState({show: false});
        });
      }

    componentDidMount() {
        this.loadUsers();
    }

    selectUser(param) {
      if (param[5]== true) {
        this.setState({isAdmin: true});
      } else {
        this.setState({isAdmin: false});
      }
      this.setState({id: param[0], username: param[1], age: param[2], hobby: param[3], film: param[4], show: true})
    }

    handleUsernameChange(event) {
      this.setState({username: event.target.value})
    }
  
    handleAdminChange(event) {
      this.setState({isAdmin: event.target.value})
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
  const admin = isAdmin();
  return (
    <div>
      <p>Users:</p>
      {!auth || !admin ? <Redirect to={{pathname: '/login'}}/> :
      <div>
        {this.state.show ? <div>
        <input placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
        <input placeholder='Age' type="number" min="1" max="99" value={this.state.age} onChange={this.handleAgeChange.bind(this)} />
        <br/>
        <input placeholder='Hobby' value={this.state.hobby} onChange={this.handleHobbyChange.bind(this)} />
        <input placeholder='Film' value={this.state.film} onChange={this.handleFilmChange.bind(this)} />
        <br/>
        <button onClick={this.removeUser.bind(this)}>delete</button>
         <button onClick={this.update.bind(this)}>update</button>
          {!this.state.isAdmin ? <button onClick={this.makeAdmin.bind(this)}>make admin</button>: null}
        </div> : null}
      <table>
      <thead>
        <tr>
            <th>Username</th> 
            <th>Age</th>
            <th>Hobby</th>
            <th>Film</th>
            <th>Admin?</th>
        </tr>
        </thead>
        <tbody>
        {this.state.users.map(u => 
           <tr key={u._id} onClick={this.selectUser.bind(this, [u._id, u.username, u.age, u.hobby, u.film, u.isAdmin])}>
                <td>{u.username}</td> 
                <td>{u.age}</td> 
                <td>{u.hobby}</td>
                <td>{u.film}</td>
                <td>{u.isAdmin.toString()}</td>
            </tr>
  
        )}
        </tbody>
        </table>
      </div>}
    </div>
  )};

};

export default Users;
import React, { Component } from "react";
import {isAuthenticated, getProfile, getQuestions} from "./helpers";
import {Redirect} from 'react-router-dom'
import './Profile.css';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          username: "",
          age: "",
          hobby: "",
          film: "",
          questions: []
         };
      
      }

      loadQuestions() {
        getQuestions(localStorage.getItem('username')).end((err, res) => {
            if (res.status !== 500) {
               this.setState({questions: res.body})
            } else {
                console.log("bad");
            }
          })
      }

      loadProfile() {
        getProfile(localStorage.getItem('id')).end((err, res) => {
            if (res.status !== 500) {
               this.setState({username: res.body.username, age: res.body.age, hobby: res.body.hobby, film: res.body.film})
            } else {
                console.log("bad");
            }
          })
      }
    

      componentDidMount() {
          this.loadProfile();
          this.loadQuestions();
      }

 render() {
    const auth = isAuthenticated();
  return (
    <div>
      <p>Profile</p>
      {!auth ? <Redirect to={{pathname: '/login'}}/> : 
      <div className="profile"> <h3>{this.state.username}</h3>
      <h5> {this.state.age} years old, like {this.state.hobby}. Favorite film is {this.state.film} .</h5>
   
        <table>
        <thead>
            <tr>
                <th>Topic</th> 
                <th>Text</th>
                <th>Answer</th>
            </tr>
        </thead>
        <tbody>
        {this.state.questions.map(q => 
           <tr key={q._id}>
                <td>{q.topic}</td> 
                <td>{q.text}</td>
                <td>{q.answer}</td>
            </tr>
  
        )}
        </tbody>
        </table>
      
      </div>}

    </div>
  )};

};

export default Profile;
import React, { Component } from "react";
import {isAuthenticated, isAdmin, getAllQuestions, updateQuestion} from "./helpers";
import {Redirect} from 'react-router-dom'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: "",
          text: "",
          questions:  [] };

      }

    loadQuestions() {
          
        getAllQuestions().end((err, res) => {
           this.setState({questions: res.body});
      });
    }

    answer() {
      updateQuestion(this.state.id, this.state.text).end((err, res) => {
        if (res.status !== 500) {
          console.log(res);
        } else {
          console.log("something bad");
        }
        this.loadQuestions(); 
      });
    }

    componentDidMount() {
      this.loadQuestions();
    }



  selectQuestion(params) {
    this.setState({id: params[0]});
  }

  handleTextChange(event) {
    
    this.setState({text: event.target.value})
  }
      

 render() {
  const auth = isAuthenticated();
  const admin = isAdmin();
  return (
    <div>
      <p>Users:</p>
      {!auth || !admin ? <Redirect to={{pathname: '/login'}}/> : <div>
      <input placeholder="question id" value={this.state.id}  readOnly />
      <br/>
      <textarea placeholder='text' rows="10" cols="45"  value={this.state.text} onChange={this.handleTextChange.bind(this)} />
      <br/>
      <button onClick={this.answer.bind(this)}>answer</button>
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
         <tr key={q._id} onClick={this.selectQuestion.bind(this, [q._id])}>
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

export default Admin;
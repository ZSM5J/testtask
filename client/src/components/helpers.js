import superagent from 'superagent';

function isAuthenticated() {
    const username = localStorage.getItem('username')
    if (username) {
        return true;
    } else {
       return false
    }
} 

function isAdmin() {
    const admin = localStorage.getItem('isAdmin')
    if (admin == "true") {
        return true;
    } else {
       return false
    }
} 

const BASE_URL = 'http://localhost:7755/';

function getUsers() {
   return superagent.get(BASE_URL + "users")
}

function login(username, password) {
    return superagent.post(BASE_URL + "login").send({ username: username, password: password })
 }

 function logout() {
     localStorage.clear();
 }

 function register(username, password, age, hobby, film, isAdmin) {
    return superagent.post(BASE_URL + "users/new").send({ username: username, password: password,
    age: age, hobby: hobby, film: film, isAdmin: isAdmin })
 }

 function ask(username, topic, date, text, answer) {
    return superagent.post(BASE_URL + "questions/new").send({ username: username, topic: topic,
    date: date, text: text, answer: answer})
 }

 function getProfile(id) {
    return superagent.get(BASE_URL + "users/" + id)
 }

 function getQuestions(username) {
    return superagent.get(BASE_URL + "questions/user/" + username)
 }

 function getAllQuestions() {
    return superagent.get(BASE_URL + "questions")
 }

 function deleteUser(id) {
    return superagent.delete(BASE_URL + "users/" + id).send({})
 }

 function updateUser(id, age, hobby, film, isAdmin) {
    return superagent.put(BASE_URL + "users/" + id).send({age: age, hobby: hobby, film: film, isAdmin: isAdmin})
 }

 function updateQuestion(id, answer) {
    return superagent.put(BASE_URL + "questions/" + id).send({answer: answer})
 }

export {isAuthenticated, getUsers, login, logout, getAllQuestions, updateQuestion, isAdmin, register, ask, getProfile, getQuestions, deleteUser, updateUser};
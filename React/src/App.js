import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state = {
      allUsers: [],
      user: {
        name: '',
        email: '',
        password: ''
      },
    }

  componentDidMount() {
    this.getUser();
  }

  getUser = _ => {
    fetch(`http://localhost:4000/user`)
    .then(response => response.json())
    .then(response => this.setState({ allUsers: response.data }))
    .catch(err => console.error(err))
  }

  addUser = _ => {
    const { user } = this.state;
    fetch(`http://localhost:4000/user/addUser?name=${user.name}&email=${user.email}&password=${user.password}`)
    .then(response => response.json())
    .then(this.getUser())
    .catch(err => console.error(err))
  }

  deleteUser = _ => {
    const { user } = this.state;
    fetch(`http://localhost:4000/user/deleteUser?name=${user.name}`)
    .then(response => response.json())
    .then(this.getUser())
    .catch(err => console.error(err))
  }

  renderUser = ({ id, name, email }) => <div key={id}>Name: {name} | Email: {email}</div>

render() {
    const { allUsers, user } = this.state
    return (
      <div className="App">
        {allUsers.map(this.renderUser)}
      
      <div>
        <input 
          value={user.name} 
          onChange={e => this.setState({user: { ...user, name: e.target.value }})} />
        <input 
          value={user.age} 
          onChange={e => this.setState({user: { ...user, email: e.target.value }})} />

        <button onClick={this.addUser}>Add</button>
        
        <button onClick={this.deleteUser}>Delete</button>

      </div>
    </div>
    );
  }
}


export default App;


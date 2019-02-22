import React, { Component } from 'react';

import './App.css';

class App extends Component {
  
  state = {
      allUsers: [],
      user: {
        name: '',
        age: '',
        image: ''
      },
    }

  componentDidMount() {
    this.getUser();
  }

  getUser = _ => {
    fetch(`http://localhost:4000/user`)
    .then(response => response.json())
    .then(response => this.setState({ allUsers: response.data} ))
    .catch(err => console.error(err))
  }

  addUser = _ => {
    const { user } = this.state;
    fetch(`http://localhost:4000/user/addUser?name=${user.name}&age=${user.age}&image=${user.image}`)
    .then(response => response.json())
    .then(this.getUser())
    .catch(err => console.error(err))
  }

  renderUser = ({ id, name, age }) => <div key={id}>{name} {age}</div>

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
          onChange={e => this.setState({user: { ...user, age: e.target.value }})} />

        <button onClick={this.addUser}>Add</button>
      </div>
    </div>
    );
  }
}


export default App;


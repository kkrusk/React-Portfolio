import React, { Component } from 'react';
import { Button, Form, Carousel, Jumbotron, Navbar, NavbarBrand } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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

  renderUser = ({ id, name, email }) => <li key={id}>Name: {name} | Email: {email}</li>

  render() {
    const { allUsers, user } = this.state
    return (

      <div>
        
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="https://picsum.photos/200/300/?random"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      {' React Bootstrap'}
    </Navbar.Brand>
  </Navbar>

            <Carousel.Caption>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={user.name}
                    onChange={e => this.setState({ user: { ...user, name: e.target.value } })} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={user.password}
                    onChange={e => this.setState({ user: { ...user, password: e.target.value } })} />
                </Form.Group>

                {/* <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="-- I might do nothing with this --" />
                </Form.Group> */}

                <Button variant="primary" type="submit"> Login </Button>

                <Button variant='Primary' onClick={this.deleteUser}>Delete</Button>

              </Form>
            </Carousel.Caption>
          
      </div>
    );
  }
}

export default App;

/*
        {allUsers.map(this.renderUser)}

        <button onClick={this.addUser}>Add</button>
*/
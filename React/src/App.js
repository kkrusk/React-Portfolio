import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  ButtonToolbar,
  Button,
  Form,
  Navbar,
  FormControl,
  Table,
  Modal,
  Image
} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class MyVerticallyCenteredModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Register</h4>
          <p>
            This is going to be a register page
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class App extends Component {
  state = {
    allUsers: [],

    user: {
      name: '',
      email: '',
      password: ''
    },

    modalShow: false
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
    fetch(`http://localhost:4000/user/deleteUser?id=${user.id}`)
      .then(response => response.json())
      .then(this.getUser())
      .catch(err => console.error(err))
  }

  login = _ => {
    const { user } = this.state;
    fetch(`http://localhost:4000/user/login?email=${user.email}&password=${user.password}`)
      .then(response => response.json())
      .then(this.getUser())
      .catch(err => console.error(err))
  }

  renderUserId = ({ id }) => <tr key={id}>{id}</tr>
  renderUserName = ({ id, name }) => <tr key={id}>{name}</tr>
  renderUserEmail = ({ id, email }) => <tr key={id}>{email}</tr>

  render() {
    const { allUsers, user } = this.state;
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div className='App' style={{ backgroundColor: "#44014C", width: "100%", minHeight: "100%"}}>

        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://picsum.photos/200/300/?random"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' kkPortfolio'}
          </Navbar.Brand>

          <Form inline>
            <FormControl
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              type="text"
              value={user.email}
              onChange={e => this.setState({ user: { ...user, email: e.target.value } })}
            />
          </Form>

          <Form inline>
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              type="password"
              value={user.password}
              onChange={e => this.setState({ user: { ...user, password: e.target.value } })} className=" mr-sm-2" />

            <Button type="submit" onClick={this.login}>Login</Button>
          </Form>

        </Navbar>

        

        <Navbar sticky="bottom" bg="dark" variant="dark">
              <ButtonToolbar>
                <Button
                  variant="success"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  Register
            </Button>

                <MyVerticallyCenteredModal
                  show={this.state.modalShow}
                  onHide={modalClose}
                />
              </ButtonToolbar>
              </Navbar>
         
      </div>
    );
  }
}

export default App;


/*
<Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>

            <td>{allUsers.map(this.renderUserId)}</td>
            <td>{allUsers.map(this.renderUserName)}</td>
            <td>{allUsers.map(this.renderUserEmail)}</td>


          </tbody>
        </Table>
*/
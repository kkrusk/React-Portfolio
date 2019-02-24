import React, { Component } from 'react';
import {
  ButtonToolbar,
  Button,
  Form,
  Navbar,
  FormControl,
  Table,
  Modal
} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class MyVerticallyCenteredModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
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

  renderUserId = ({ id }) => <tr key={id}> {id} </tr>
  renderUserName = ({ id, name }) => <tr key={id}> {name} </tr>
  renderUserEmail = ({ id, email }) => <tr key={id}> {email} </tr>

  render() {
    const { allUsers, user } = this.state;
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div className='App'>
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

            <Button type="submit" onClick={this.deleteUser}>Submit</Button>
          </Form>

        </Navbar>
        
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <th>{allUsers.map(this.renderUserId)}</th>
            <th>{allUsers.map(this.renderUserName)}</th>
            <th>{allUsers.map(this.renderUserEmail)}</th>
          </tbody>
        </Table>

        <div class="navbar navbar-default navbar-fixed-bottom">
          <div class="container">
            <p class="navbar-text pull-left">
              <ButtonToolbar>
                <Button
                  variant="primary"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  Launch vertically centered modal
            </Button>

                <MyVerticallyCenteredModal
                  show={this.state.modalShow}
                  onHide={modalClose}
                />
              </ButtonToolbar>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default App;


/*
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

             <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="-- I might do nothing with this --" />
                </Form.Group>

                <Button variant="primary" type="submit"> Login </Button>

                <Button variant='Primary' onClick={this.deleteUser}>Delete</Button>


                <ButtonToolbar>
                  <Button
                    variant="primary"
                    onClick={() => this.setState({ modalShow: true })}
                  >
                    Launch vertically centered modal
            </Button>

                  <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                  />
                </ButtonToolbar>


              </Form>
            </Carousel.Caption>
*/
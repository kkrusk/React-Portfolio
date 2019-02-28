import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import CarouselPage from "./components/carousel.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import LoginModal from "./components/loginModal.jsx";

// YOU DON'T CARE ABOUT THIS
class App extends Component {
  state = {
    allUsers: [],

    user: {
      name: "",
      email: "",
      password: ""
    }
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = _ => {
    fetch(`http://localhost:4000/user`)
      .then(response => response.json())
      .then(response => this.setState({ allUsers: response.data }))
      .catch(err => console.error(err));
  };

  deleteUser = _ => {
    const { user } = this.state;
    fetch(`http://localhost:4000/user/deleteUser?id=${user.id}`)
      .then(response => response.json())
      .then(this.getUser())
      .catch(err => console.error(err));
  };

  login = _ => {
    const { user } = this.state;
    fetch(
      `http://localhost:4000/user/login?email=${user.email}&password=${
        user.password
      }`
    )
      .then(response => response.json())
      .catch(err => console.error(err));
  };

  renderUserId = ({ id }) => <tr key={id}>{id}</tr>;
  renderUserName = ({ id, name }) => <tr key={id}>{name}</tr>;
  renderUserEmail = ({ id, email }) => <tr key={id}>{email}</tr>;

  render() {
    return (
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  }
}

// This is what you really care about
class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/login" component={Projects} />
          <Route exact path="/register" component={Projects} />
        </div>

        <Footer />
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <CarouselPage className="test" />;
  }
}

class Projects extends Component {
  render() {
    return <CarouselPage />;
  }
}

class Login extends Component {
  state = {
    model14: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return <LoginModal />;
  }
}

class Register extends Component {
  render() {
    return <h1>This is the Register modal</h1>;
  }
}

export default App;

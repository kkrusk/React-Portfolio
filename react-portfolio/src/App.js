import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import CarouselPage from "./components/Carousel.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/LoginModal.jsx";

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
      .then(response => this.setState({allUsers: response.data}))
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

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/login" component={Login} />
        </div>

        <Footer />
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <CarouselPage />;
  }
}

class Projects extends Component {
  render() {
    return ( 
      <React.Fragment>
        <CarouselPage />      
      </React.Fragment>
      
    )
  }
}

class Login extends Component {
  render() {
    return <CarouselPage />;
  }
}


export default App;

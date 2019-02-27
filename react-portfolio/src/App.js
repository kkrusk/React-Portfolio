import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import CarouselPage from "./components/carousel.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

// YOU DON'T CARE ABOUT THIS
class App extends React.Component {
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
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/Projects" component={Projects} />
        </div>

        <Footer />
      </div>
    );
  }
}

// This is what you really care about
class Home extends React.Component {
  render() {
    return <CarouselPage />;
  }
}

// This is what you could care about
class Projects extends React.Component {
  render() {
    return <CarouselPage />;
  }
}

export default App;

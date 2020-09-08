import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import ExamPanel from "../../Panel/ExamPanel/ExamPanel";
import LoginForm from "../LoginForm/LoginForm";
const PersonResponse = require("../../../apis/stub/profiledata.json");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      isLoaded: false,
      personAuthData: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (Cookies.get("authCookie")) {
      console.log(Cookies.get("authCookie"));
      this.setState({ isAuth: true });
    }

    fetch("https://api.example.com/itemsw")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            personAuthData: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            personAuthData: PersonResponse,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <Button variant="secondary" size="lg" onClick={this.handleLogout}>
          Logout
        </Button>
        {this.state.isAuth ? (
          <ExamPanel />
        ) : (
          <LoginForm loginHandler={this.handleLogin} />
        )}
      </div>
    );
  }

  handleLogin(email, password) {
    if (
      email &&
      password &&
      this.state.personAuthData &&
      this.state.personAuthData.profile &&
      email === this.state.personAuthData.profile[0].email &&
      password === this.state.personAuthData.profile[0].password
    ) {
      Cookies.set("authCookie", "value", { expires: 1 / 96, path: "" });
      this.setState({ isAuth: true });
    }
  }

  handleLogout() {
    Cookies.remove("authCookie");
    if (!Cookies.get("authCookie")) {
      this.setState({ isAuth: false });
    }
  }
}

export default Login;

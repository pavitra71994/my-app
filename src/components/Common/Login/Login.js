import React, { Component } from "react";
import Cookies from "js-cookie";
import ExamPanel from "../../Panel/ExamPanel/ExamPanel";
import GlobalNav from "../../Common/GlobalNav/GlobalNav";
import LoginForm from "../../Common/LoginForm/LoginForm";
import Register from "../../Common/Register/Register";
import "./Login.css";
const PersonResponse = require("../../../apis/stub/profiledata.json");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      isLoaded: false,
      personAuthData: {},
      showRegistrationPageFlag: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  handleLogout() {
    const domain = window.location.hostname;
    const path = window.location.pathname;
    console.log(path + " >>>>" + domain);
    Cookies.remove("authCookie", {
      path: path,
      domain: domain,
    });
    console.log("inside handlelogout > login.js");
    console.log("cookie value > >" + Cookies.get("authCookie"));
    if (!Cookies.get("authCookie")) {
      console.log(
        "inside handlelogout > login.js >checking cookie after removing"
      );
      this.setState({ isAuth: false });
    }
  }

  registerHandler() {
    this.setState({
      showRegistrationPageFlag: true,
    });
    console.log("register");
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
        <GlobalNav
          handleLogout={this.handleLogout}
          handleLogin={this.handleLogin}
        />
        {this.state.isAuth ? (
          <ExamPanel />
        ) : !this.state.show ? (
          <div className="bkImg">
            <LoginForm
              loginHandler={this.handleLogin}
              registerHandler={this.modalShow}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  handleLogin(email, password) {
    const domain = window.location.hostname;
    const path = window.location.pathname;
    if (
      email &&
      password &&
      this.state.personAuthData &&
      this.state.personAuthData.profile &&
      email === this.state.personAuthData.profile[0].email &&
      password === this.state.personAuthData.profile[0].password
    ) {
      Cookies.set("authCookie", "value", {
        expires: 1 / 96,
        path: path,
        domain: domain,
      });
      this.setState({ isAuth: true });
    }
  }
}

export default Login;

import React, { Component } from "react";
import Cookies from "js-cookie";
import ExamPanel from "../../Panel/ExamPanel/ExamPanel";
import LoginForm from "../LoginForm/LoginForm";
import GlobalNav from "../../Common/GlobalNav/GlobalNav";
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

  handleLogout() {
    Cookies.remove("authCookie");
    console.log("inside handlelogout > login.js");
    console.log("cookie value > >" + Cookies.get("authCookie"));
    if (!Cookies.get("authCookie")) {
      console.log(
        "inside handlelogout > login.js >checking cookie after removing"
      );
      this.setState({ isAuth: false });
    }
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
}

export default Login;

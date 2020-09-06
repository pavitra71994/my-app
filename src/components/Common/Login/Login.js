import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import ExamPanel from "../../Panel/ExamPanel/ExamPanel";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (Cookies.get("authCookie")) {
      console.log(Cookies.get("authCookie"));
      this.setState({ isAuth: true });
    }
  }

  render() {
    return (
      <div>
        <Button variant="secondary" size="lg" onClick={this.handleLogin}>
          Login
        </Button>
        <Button variant="secondary" size="lg" onClick={this.handleLogout}>
          Logout
        </Button>
        {this.state.isAuth ? "<ExamPanel />" : ""}
      </div>
    );
  }

  handleLogin() {
    Cookies.set("authCookie", "value", { expires: 1 / 96, path: "" });
    this.setState({ isAuth: true });
  }

  handleLogout() {
    Cookies.remove("authCookie");
    if (!Cookies.get("authCookie")) {
      this.setState({ isAuth: false });
    }
  }
}

export default Login;

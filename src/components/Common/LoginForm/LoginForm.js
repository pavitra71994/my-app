import React, { Component } from "react";

import { Button, Form } from "react-bootstrap";
import Register from "../Register";
import "./LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      show: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.modalShow = this.modalShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  modalShow() {
    console.log("clicked1");
    this.setState({
      show: true,
    });
  }

  onHide() {
    console.log("clicked");
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <Form className="FormContainerBox">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <div className="ButtonBoxLoginPage">
            <Button
              variant="primary"
              type="submit"
              className="buttonLookLogin"
              onClick={() =>
                this.props.loginHandler(this.state.email, this.state.password)
              }
            >
              Submit
            </Button>
            <Button
              variant="success"
              className="buttonLookregister"
              onClick={this.modalShow}
            >
              New User? Register
            </Button>
          </div>
        </Form>
        {this.state.show ? (
          <Register show={this.modalShow} onHide={this.onHide} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default LoginForm;

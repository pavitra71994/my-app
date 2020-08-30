import React, { Component } from "react";
import "./ModalBox.css";
import { Modal, Button } from "react-bootstrap";

class ModalBox extends Component {
  render() {
    const handleClose = this.props.handleClose;
    const show = this.props.show;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>R u Sure....!!!! escape key.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.showPage}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalBox;

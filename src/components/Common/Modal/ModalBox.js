import React, { Component } from "react";
import "./ModalBox.css";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import TableComp from "../TableComp";

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
          <Modal.Title>Do You Want to Submit?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <TableComp
            data={{
              totalQues: this.props.data.totalQues,
              answeredQues: this.props.data.answeredQues,
            }}
          />
        </Modal.Body>
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

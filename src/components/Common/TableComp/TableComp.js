import React, { Component } from "react";
import { Table } from "react-bootstrap";

class TableComp extends Component {
  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Answered</th>
              <th>UnAnswered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.data.answeredQues}</td>
              <td>
                {this.props.data.totalQues - this.props.data.answeredQues}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TableComp;

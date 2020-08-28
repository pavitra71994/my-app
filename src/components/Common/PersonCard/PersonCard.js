import React, { Component } from "react";
import "./PersonCard.css";

class PersonCard extends Component {
  render() {
    const item = this.props.data.items;
    return (
      <div className="baseCard">
        {item.map((item) => (
          <div className="PersonCardContainer" key={item.name}>
            {item.name} {item.price}
          </div>
        ))}
      </div>
    );
  }
}

export default PersonCard;

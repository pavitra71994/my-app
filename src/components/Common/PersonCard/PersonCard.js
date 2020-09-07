import React, { Component } from "react";
import "./PersonCard.css";
import image from "../../../svgIcons/16.jpg";
import UberReactVisComp from "../UberReactVisComp/UberReactVisComp";

class PersonCard extends Component {
  render() {
    return (
      <div className="PersonCardContainer">
        <div className="imgBox">
          <img src={image}></img>
        </div>
        <div className="basicInfoBox">
          <div className="nameLabel">Pavitra Kumar Nayak</div>
          <div className="otherDetailLook">
            <div className="detailsLook">1201212</div>
            <div className="detailsLook">Noida</div>
            <div className="detailsLook">pavitrank1@gmail.com</div>
          </div>
          <div className="dateLook">10th March 2020</div>
        </div>
        <UberReactVisComp />
      </div>
    );
  }
}

export default PersonCard;

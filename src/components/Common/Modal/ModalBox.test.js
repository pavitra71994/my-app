import React from "react";
import { shallow } from "enzyme";
import ModalBox from "./ModalBox";

describe("Modal", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ModalBox />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import ReactPie from './ReactPie';

describe('ReactPie', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ReactPie />);
    expect(wrapper).toMatchSnapshot();
  });
});

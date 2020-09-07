import React from 'react';
import { shallow } from 'enzyme';
import UberReactVisComp from './UberReactVisComp';

describe('UberReactVisComp', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UberReactVisComp />);
    expect(wrapper).toMatchSnapshot();
  });
});

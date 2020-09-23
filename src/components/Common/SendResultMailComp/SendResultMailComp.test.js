import React from 'react';
import { shallow } from 'enzyme';
import SendResultMailComp from './SendResultMailComp';

describe('SendResultMailComp', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SendResultMailComp />);
    expect(wrapper).toMatchSnapshot();
  });
});

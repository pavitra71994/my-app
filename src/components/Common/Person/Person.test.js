import React from 'react';
import { shallow } from 'enzyme';
import Person from './Person';

describe('Person', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Person />);
    expect(wrapper).toMatchSnapshot();
  });
});

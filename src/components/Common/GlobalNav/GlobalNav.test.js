import React from 'react';
import { shallow } from 'enzyme';
import GlobalNav from './GlobalNav';

describe('GlobalNav', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GlobalNav />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import ResultCard from './ResultCard';

describe('ResultCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ResultCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

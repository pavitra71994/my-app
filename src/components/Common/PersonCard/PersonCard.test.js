import React from 'react';
import { shallow } from 'enzyme';
import PersonCard from './PersonCard';

describe('PersonCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<PersonCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

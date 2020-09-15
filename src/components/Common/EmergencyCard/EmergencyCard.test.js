import React from 'react';
import { shallow } from 'enzyme';
import EmergencyCard from './EmergencyCard';

describe('EmergencyCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<EmergencyCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import TimerCard from './TimerCard';

describe('TimerCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TimerCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

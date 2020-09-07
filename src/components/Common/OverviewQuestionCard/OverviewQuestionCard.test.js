import React from 'react';
import { shallow } from 'enzyme';
import OverviewQuestionCard from './OverviewQuestionCard';

describe('OverviewQuestionCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<OverviewQuestionCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import QuestionCard from './QuestionCard';

describe('QuestionCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<QuestionCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

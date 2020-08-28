import React from 'react';
import { shallow } from 'enzyme';
import ExamPanel from './ExamPanel';

describe('ExamPanel', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ExamPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});

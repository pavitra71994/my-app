import React from 'react';
import { shallow } from 'enzyme';
import ExamOverviewPanel from './ExamOverviewPanel';

describe('ExamOverviewPanel', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ExamOverviewPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});

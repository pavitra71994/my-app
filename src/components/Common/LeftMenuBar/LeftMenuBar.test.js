import React from 'react';
import { shallow } from 'enzyme';
import LeftMenuBar from './LeftMenuBar';

describe('LeftMenuBar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<LeftMenuBar />);
    expect(wrapper).toMatchSnapshot();
  });
});

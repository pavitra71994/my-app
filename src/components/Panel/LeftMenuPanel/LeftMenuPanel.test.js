import React from 'react';
import { shallow } from 'enzyme';
import LeftMenuPanel from './LeftMenuPanel';

describe('LeftMenuPanel', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<LeftMenuPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});

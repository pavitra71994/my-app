import React from 'react';
import { shallow } from 'enzyme';
import SidePanel from './SidePanel';

describe('SidePanel', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SidePanel />);
    expect(wrapper).toMatchSnapshot();
  });
});

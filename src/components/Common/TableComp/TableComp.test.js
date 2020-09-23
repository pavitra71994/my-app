import React from 'react';
import { shallow } from 'enzyme';
import TableComp from './TableComp';

describe('TableComp', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TableComp />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import LoadingStrip from './';

describe('<LoadingStrip />', () => {
  it('should render children if defined', () => {
    const wrapper = shallow(<LoadingStrip>Hi</LoadingStrip>);

    expect(wrapper).to.contain('Hi');
  });

  it('should be loading if children undefined', () => {
    const wrapper = shallow(<LoadingStrip />);

    expect(wrapper).to.contain('Loading...');
  });

  it('should be loading long if children undefined', () => {
    const wrapper = shallow(<LoadingStrip long />);

    expect(wrapper).to.contain('Loading just a sec...');
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Container from './';

describe('<Container />', () => {
  it('should use div as default markup', () => {
    const wrapper = shallow(<Container />);

    expect(wrapper.find('div')).to.exist;
  });

  it('should use custom tag as markup', () => {
    const wrapper = shallow(<Container tag="header" />);

    expect(wrapper.find('header')).to.exist;
    expect(wrapper.find('div')).to.not.exist;
  });

  it('shoud pass classname down', () => {
    const wrapper = shallow(<Container className="cool" />);

    expect(wrapper).to.have.className('cool');
  });
});

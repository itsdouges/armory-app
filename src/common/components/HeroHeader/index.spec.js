import React from 'react';
import { shallow } from 'enzyme';
import HeroHeader from './';

describe('<HeroHeader />', () => {
  it('should render title inside header', () => {
    const wrapper = shallow(<HeroHeader title="cool header" />);

    expect(wrapper.find('header')).to.contain('cool header');
  });

  it('should pass in bg props', () => {
    const props = {
      backgroundColor: 'black',
      backgroundImage: 'https://image.com',
    };

    const wrapper = shallow(<HeroHeader {...props} />);

    expect(wrapper.children().find('div').props().style).to.include({
      backgroundColor: props.backgroundColor,
      backgroundImage: `url(${props.backgroundImage})`,
    });
  });

  it('should place children', () => {
    const wrapper = shallow(<HeroHeader>Cool Children</HeroHeader>);

    expect(wrapper).to.contain('Cool Children');
  });
});

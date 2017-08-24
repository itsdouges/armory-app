import React from 'react';
import { shallow } from 'enzyme';
import { stubStyles } from 'test/utils';

const styles = stubStyles([
  'root',
  'small',
]);

const Card = proxyquire('common/components/Card', {
  './styles.less': styles,
});

describe('<Card />', () => {
  const props = {
    className: 'cool-class',
    title: 'cool-title',
    size: 'small',
    children: <span>cool</span>,
  };

  let wrapper;

  before(() => {
    wrapper = shallow(<Card {...props} />);
  });

  it('should root class', () => {
    expect(wrapper).to.have.className(styles.root);
  });

  it('should set size class', () => {
    expect(wrapper).to.have.className(styles[props.size]);
  });

  it('should pass classname down', () => {
    expect(wrapper).to.have.className(props.className);
  });

  it('should nest children', () => {
    expect(wrapper).to.contain(props.children);
  });
});

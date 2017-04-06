import { shallow } from 'enzyme';

import { stubComponent } from 'test/utils';
import tooltipDebounce from './';

describe('tooltipDebounce decorator', () => {
  const props = {
    extra: 'stuff',
    yeah: true,
  };

  let Component;
  let DecoratedComponent;
  let wrapper;
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
    Component = stubComponent('Component');
    DecoratedComponent = tooltipDebounce()(Component);
    wrapper = shallow(<DecoratedComponent {...props} />);
  });

  const forwardTime = () => clock.tick(150);

  it('should pass extra props to children', () => {
    expect(wrapper.find(Component)).to.have.props(props);
  });

  describe('showing', () => {
    it('should immediately callback', () => {
      const spy = sinon.spy();
      const { show } = wrapper.props();

      show(spy);

      expect(spy).to.have.been.called;
    });
  });

  describe('hiding', () => {
    it('should callback after wait has expired', () => {
      const spy = sinon.spy();
      const { hide } = wrapper.props();

      hide(spy);
      forwardTime();

      expect(spy).to.have.been.called;
    });

    it('should cancel callback if show is called during wait time', () => {
      const spy = sinon.spy();
      const { hide, show } = wrapper.props();

      hide(spy);
      show();
      forwardTime();

      expect(spy).to.not.have.been.called;
    });

    it('should show after cancelling', () => {
      const spy = sinon.spy();
      const { hide, show } = wrapper.props();

      hide(spy);
      show();
      forwardTime();
      hide(spy);
      forwardTime();

      expect(spy).to.have.been.called;
    });
  });
});

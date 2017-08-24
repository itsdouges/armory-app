import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

import { stubRedux, stubDecoratorWithArgs, describeConnect } from 'test/utils';

const sandbox = sinon.sandbox.create();
const showTooltip = sandbox.spy();

const stubs = {
  'react-debounce-decorator': stubDecoratorWithArgs,
  'features/Gw2/actions': { showTooltip },
};

const TooltipTrigger = proxyquire('common/components/TooltipTrigger', {
  ...stubRedux,
  ...stubs,
});

describeConnect('common/components/TooltipTrigger', stubs, (mstp, mdtp) => {
  it('should not use map state to props', () => {
    expect(mstp).to.equal(_.noop);
  });

  it('should pass down show tooltip', () => {
    expect(mdtp).to.eql({
      showTooltip,
    });
  });
});

describe('<TooltipTrigger />', () => {
  const props = {
    onMouseEnter: sandbox.spy(),
    onMouseLeave: sandbox.spy(),
    show: (cb) => cb(),
    hide: (cb) => cb(),
    data: 'neat',
    type: 'item',
    showTooltip,
  };

  let wrapper;
  let onMouseEnter;
  let onMouseLeave;

  before(() => {
    wrapper = shallow(
      <TooltipTrigger {...props}>
        <div />
      </TooltipTrigger>
    );

    ({ onMouseLeave, onMouseEnter } = wrapper.find('div').props());
  });

  afterEach(() => {
    sandbox.reset();
  });

  context('when children is null', () => {
    it('should render nothing', () => {
      const emptyWrapper = shallow(<TooltipTrigger />);

      expect(emptyWrapper.html()).to.not.exist;
    });
  });

  describe('showing', () => {
    const e = {};

    beforeEach(() => {
      onMouseEnter(e);
    });

    it('should call passed down onMouseEnter', () => {
      expect(props.onMouseEnter).to.have.been.calledWith(e);
    });

    it('should show tooltip', () => {
      expect(showTooltip).to.have.been.calledWith(true, {
        data: props.data,
        type: props.type,
      });
    });
  });

  describe('hiding', () => {
    const e = {};

    beforeEach(() => {
      onMouseLeave(e);
    });

    it('should call passed down onMouseLeave', () => {
      expect(props.onMouseLeave).to.have.been.calledWith(e);
    });

    it('should hide tooltip', () => {
      expect(showTooltip).to.have.been.calledWith(false);
    });
  });
});

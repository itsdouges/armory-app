import React from 'react';
import { shallow } from 'enzyme';
import { stubComponent } from 'test/utils';

const Base = stubComponent('Base');
const Tooltip = stubComponent('Tooltip');
const render = sinon.stub();

const bootstrap = proxyquire('lib/tooltip', {
  'common/components/Tooltip': Tooltip,
  '../Base': Base,
  'react-dom': { render },
});

describe('mounting tooltip', () => {
  const container = document.createElement('div');
  const props = { yeah: true };
  let createElementPrev;

  before(() => {
    createElementPrev = document.createElement;
    document.createElement = () => container;

    bootstrap(props);
  });

  after(() => {
    document.createElement = createElementPrev;
  });

  it('should mount tooltip', () => {
    expect(render).to.have.been.calledWith(sinon.match.any, container);
  });

  it('should pass down props', () => {
    const [jsx] = render.firstCall.args;

    const wrapper = shallow(jsx);

    expect(wrapper.find(Tooltip)).to.contain(<Tooltip {...props} />);
  });
});

import _ from 'lodash';

const debounce = sinon.spy();

const proxyFunction = proxyquire('lib/proxy', {
  'lodash/debounce': (...args) => debounce(...args) || _.debounce(...args),
});

describe('function proxy', () => {
  const debounceTime = 50;
  const func = sinon.spy();

  let wrappedFunction;
  let clock;

  before(() => {
    wrappedFunction = proxyFunction(debounceTime)(func);
    clock = sinon.useFakeTimers();
  });

  after(() => {
    func.reset();
    clock.restore();
  });

  const forwardTime = () => clock.tick(debounceTime);

  it('should batch up calls', () => {
    wrappedFunction([1, 2]);
    wrappedFunction([3, 4]);
    wrappedFunction([5, 6]);

    forwardTime();

    expect(func).to.have.been.calledOnce;
    expect(func).to.have.been.calledWith([1, 2, 3, 4, 5, 6]);
  });

  it('should reset saved after calling', () => {
    wrappedFunction([1]);

    forwardTime();
    func.reset();

    wrappedFunction([2]);
    forwardTime();

    expect(func).to.have.been.calledWith([2]);
  });
});

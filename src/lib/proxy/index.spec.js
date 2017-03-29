import _ from 'lodash';

const debounce = sinon.spy();

const proxyFunction = proxyquire('lib/proxy', {
  'lodash/debounce': (...args) => debounce(...args) || _.debounce(...args),
});

describe('function proxy', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  it('should batch up calls', () => {
    const debounceTime = 50;
    const func = sinon.spy();
    const wrappedFunction = proxyFunction(debounceTime)(func);

    wrappedFunction([1, 2]);
    wrappedFunction([3, 4]);
    wrappedFunction([5, 6]);

    clock.tick(debounceTime);

    expect(func).to.have.been.calledOnce;
    expect(func).to.have.been.calledWith([1, 2, 3, 4, 5, 6]);
  });

  it('should reset saved after calling', () => {

  });
});

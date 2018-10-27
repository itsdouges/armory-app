const sandbox = sinon.sandbox.create();
const axiosGet = sandbox.stub();
const localStorage = {
  getItem: sandbox.stub(),
  removeItem: sandbox.spy(),
  setItem: sandbox.spy(),
};
const config = {
  gw2: {
    endpoint: 'https://api.gw2.com/',
  },
};

const ls = proxyquire('lib/localStorage', {
  'lz-string': {
    compressToUTF16: value => value,
    decompressFromUTF16: value => value,
  },
  axios: {
    get: axiosGet,
  },
  config,
});

describe('gw2a local storage', () => {
  before(() => {
    global.localStorage = localStorage;
  });

  after(() => {
    delete global.localStorage;
  });

  beforeEach(() => sandbox.reset());

  describe('initialise()', () => {
    it('should call api', () => {
      axiosGet.resolves({ data: {} });

      ls.initialise();

      expect(axiosGet).to.have.been.calledWith('https://api.gw2.com/v2/build');
    });

    it('should set build id but NOT set clear ls key if not saved before', async () => {
      axiosGet.resolves({ data: { id: 1234 } });

      await ls.initialise();

      expect(localStorage.setItem).to.have.been.calledOnce;
      expect(localStorage.setItem).to.have.been.calledWith('GW2A:GW2_BUILD', '1234');
    });

    it('should set build id and set clear ls key if build is is different', async () => {
      localStorage.getItem.withArgs('GW2A:GW2_BUILD').returns('4321');
      axiosGet.resolves({ data: { id: 1234 } });

      await ls.initialise();

      expect(localStorage.setItem).to.have.been.calledTwice;
      expect(localStorage.setItem).to.have.been.calledWith('GW2A:GW2_BUILD', '1234');
      expect(localStorage.setItem).to.have.been.calledWith('GW2A:CLEAR_LS_NEXT_LOAD', 'true');
    });

    it('should do nothing if the ids were the same', async () => {
      localStorage.getItem.withArgs('GW2A:GW2_BUILD').returns('4321');
      axiosGet.resolves({ data: { id: 4321 } });

      await ls.initialise();

      expect(localStorage.setItem).to.have.not.been.called;
    });
  });

  describe('get()', () => {
    it('should get data', () => {
      const value = 'i-am-value';
      localStorage.getItem.withArgs('GW2A:I-AM-KEY').returns(value);

      const actual = ls.get('i-am-key');

      expect(actual).to.equal(value);
    });
  });

  describe('set()', () => {
    it('should set data', () => {
      ls.set('i-am-key', 'i-am-value');

      expect(localStorage.setItem).to.have.been.calledWith('GW2A:I-AM-KEY', 'i-am-value');
    });
  });

  describe('clear()', () => {});

  describe('clearIfNewBuild()', () => {
    it('should clear is ls key is set', () => {
      localStorage.getItem.withArgs('GW2A:CLEAR_LS_NEXT_LOAD').returns('true');

      ls.clearIfNewBuild('key');

      expect(localStorage.removeItem).to.have.been.calledTwice;
      expect(localStorage.removeItem).to.have.been.calledWith('GW2A:KEY');
      expect(localStorage.removeItem).to.have.been.calledWith('GW2A:CLEAR_LS_NEXT_LOAD');
    });

    it('should do nothing if it is not set', () => {
      ls.clearIfNewBuild('key');

      expect(localStorage.removeItem).to.not.have.been.called;
    });
  });
});

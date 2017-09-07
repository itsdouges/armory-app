const sandbox = sinon.sandbox.create();
const compressToUTF16 = sandbox.stub();
const decompressFromUTF16 = sandbox.stub();
const axiosGet = sandbox.stub();
const config = {
  gw2: {
    endpoint: 'https://api.gw2.com/',
  },
};

const ls = proxyquire('lib/localStorage', {
  'lz-string': {
    compressToUTF16,
    decompressFromUTF16,
  },
  axios: {
    axiosGet,
  },
  config,
});

describe('gw2a local storage', () => {
  describe('initialise()', () => {
    it('should ping gw2 build', () => {

    });

    it('should set build id but NOT set clear ls key if not saved before', () => {

    });

    it('should set build id and set clear ls key if build is is different', () => {

    });
  });

  describe('get()', () => {
    it('should get data', () => {

    });
  });

  describe('set()', () => {
    it('should set data', () => {

    });
  });

  describe('clearIfNewBuild()', () => {
    it('should clear is ls key is set', () => {

    });

    it('should do nothing if it is not set', () => {

    });
  });
});


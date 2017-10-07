import proxyquire from 'proxyquire';

const sandbox = sinon.sandbox.create();
const post = sandbox.stub();

const { readCalculatedItemStats } = proxyquire.noPreserveCache().noCallThru()('./', {
  config: { default: {} },
  axios: { post },
});

describe('gw2 service', () => {
  afterEach(() => sandbox.reset());

  describe('calculated item stats', () => {
    it('should parse response into object of key itemid:statid', async () => {
      const data = [{
        id: 1379,
        name: 'Grieving',
        attributes: [],
      }];
      post.resolves({ data });

      const actual = await readCalculatedItemStats([{
        id: 1379,
        itemId: 44444,
        level: 80,
        rarity: 'Rare',
        type: 'Back',
      }]);

      expect(actual).to.eql({
        444441379: {
          id: 1379,
          itemId: 44444,
          name: 'Grieving',
          attributes: [],
        },
      });
    });
  });
});

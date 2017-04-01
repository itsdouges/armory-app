const sandbox = sinon.sandbox.create();
const translate = sandbox.stub();
const getFunc = sandbox.stub();
const dispatch = sandbox.spy();
const afterGetFunc = sandbox.stub();

const actionsFactory = proxyquire('features/Gw2/actions', {
  'i18n-react': {
    translate,
  },
  'lib/proxy': () => (func) => func,
}, true);

const resourceName = 'amulets';
const resourceNameWithAfterGet = 'afterGet';
actionsFactory.generateActions(resourceName, getFunc);
actionsFactory.generateActions(resourceNameWithAfterGet, getFunc, afterGetFunc);
const actions = actionsFactory.default;

describe('gw2 action factory', () => {
  afterEach(() => sandbox.reset());

  describe('action creator creation', () => {
    it('should create actions', () => {
      expect(actions).to.include.keys([
        'fetchAmulets',
        'fetchAmuletsError',
        'fetchAmuletsResult',
        'fetchingAmulets',
      ]);
    });
  });

  describe('action creators', () => {
    it('should create fetch result action', () => {
      const payload = { cool: 'stuff' };

      const action = actions.fetchAmuletsResult(payload);

      expect(action).to.eql({
        type: 'FETCH_AMULETS_RESULT',
        payload,
      });
    });

    it('should create fetching action', () => {
      const payload = true;

      const action = actions.fetchingAmulets(payload);

      expect(action).to.eql({
        type: 'FETCHING_AMULETS',
        payload,
      });
    });

    it('should create fetch error action', () => {
      const ids = [1, 2];
      const message = 'uh oh';

      const action = actions.fetchAmuletsError(ids, message);

      expect(action).to.eql({
        type: 'FETCH_AMULETS_ERROR',
        payload: {
          ids,
          message,
        },
      });
    });
  });

  describe('fetch thunk method', () => {
    const getStore = () => ({
      [resourceNameWithAfterGet]: {},
      [resourceName]: {
        1: {},
        2: { error: true },
      },
    });

    it('should bail out immediately if no ids are passed in', () => {
      const action = actions.fetchAmulets();

      action();

      expect(getFunc).to.not.have.been.called;
    });

    it('should filter out ids that are already in the store', () => {
      const action = actions.fetchAmulets([1, 2, 3, 4]);
      getFunc.withArgs([2, 3, 4]).returns(Promise.resolve());

      return action(dispatch, getStore);
    });

    context('when there are no ids missing', () => {
      it('should return immediately if no ids are missing', () => {
        const action = actions.fetchAmulets([1]);

        action(dispatch, getStore);

        expect(getFunc).to.not.have.been.called;
      });
    });

    context('when some data wasnt brought back in the response', () => {
      it('should dispatch those ids as errors', () => {
        const ids = [10, 11, 12];
        const action = actions.fetchAmulets(ids);
        getFunc.withArgs(ids).returns(Promise.resolve({}));
        const message = 'uh oh not found';
        translate.withArgs('messages.notFoundLong').returns(message);

        return action(dispatch, getStore)
          .then(() => {
            expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, message));
          });
      });
    });

    context('when the amount of ids to fetch are above the request limit', () => {
      it('should spread request over multiple requests', () => {
        const ids = Array(600).fill(undefined).map((x, index) => index);
        getFunc.withArgs(ids.slice(0, 200)).returns(Promise.resolve());
        getFunc.withArgs(ids.slice(200, 400)).returns(Promise.resolve());
        getFunc.withArgs(ids.slice(400, 600)).returns(Promise.resolve());
        const action = actions.fetchAmulets(ids);

        return action(dispatch, getStore);
      });
    });

    context('when there are ids missing', () => {
      it('should trigger a loading action when starting request', () => {
        const action = actions.fetchAmulets([5]);
        getFunc.withArgs([5]).returns(Promise.resolve());

        action(dispatch, getStore);

        expect(dispatch).to.have.been.calledWith(actions.fetchingAmulets(true));
      });

      it('should get rid of duplicates', () => {
        const response = { yeah: true };
        const action = actions.fetchAmulets([3, 3, 3, 3]);
        getFunc.withArgs([3]).returns(Promise.resolve(response));

        return action(dispatch, getStore)
          .then((result) => {
            expect(result).to.eql(response);
          });
      });

      it('should ignore -1 ids', () => {
        const action = actions.fetchAmulets([5, 6, 7, '-1', -1]);
        getFunc.withArgs([5, 6, 7]).returns(Promise.resolve());

        return action(dispatch, getStore);
      });

      describe('when successfully recieved data', () => {
        const response = { yeah: true };
        let action;

        beforeEach(() => {
          action = actions.fetchAmulets([7]);
          getFunc.withArgs([7]).returns(Promise.resolve(response));
        });

        it('should dispatch loaded action', () => {
          return action(dispatch, getStore)
            .then(() => {
              expect(dispatch).to.have.been.calledWith(actions.fetchingAmulets(false));
            });
        });

        it('should dispatch resolution action', () => {
          return action(dispatch, getStore)
            .then(() => {
              expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsResult(response));
            });
        });

        context('when there is a after fetch hook', () => {
          it('should call after method', () => {
            const afterGetAction = actions.fetchAfterGet([7]);

            return afterGetAction(dispatch, getStore)
              .then(() => {
                expect(afterGetFunc).to.have.been.calledWith(dispatch, response);
              });
          });
        });
      });

      describe('when an error happens', () => {
        const ids = [7, 8];

        const createErrorAction = (status) => {
          const action = actions.fetchAmulets(ids);
          getFunc.withArgs(ids).returns(Promise.reject({
            response: {
              status,
            },
          }));

          return action(dispatch, getStore);
        };

        context('and it is a 404', () => {
          it('should dispatch an error under the item id', () => {
            const message = 'uh oh not found';

            translate.withArgs('messages.notFoundLong').returns(message);

            return createErrorAction(404).catch(() => {
              expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, message));
            });
          });
        });

        context('and it is anything else', () => {
          it('should dispatch an error under the item id', () => {
            const message = 'uh oh baad';

            translate.withArgs('messages.gw2ApiDown').returns(message);

            return createErrorAction(500).catch(() => {
              expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, message));
            });
          });
        });
      });
    });
  });

  describe('gw2 tooltip action', () => {
    it('should generate action', () => {
      const type = 'item';
      const data = { yes: true };

      const action = actionsFactory.showTooltip(true, {
        type,
        data,
      });

      expect(action).to.eql({
        type: 'SHOW_TOOLTIP',
        payload: {
          show: true,
          type,
          data,
        },
      });
    });
  });
});

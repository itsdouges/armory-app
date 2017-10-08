import proxyquire from 'proxyquire';

const sandbox = sinon.sandbox.create();
const getFunc = sandbox.stub();
const dispatch = sandbox.spy();
const afterGetFunc = sandbox.stub();

const actionsFactory = proxyquire.noCallThru()('./actions', {
  'function-batch': (func) => func,
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
        payload: {
          data: payload,
          noCache: [],
        },
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

      const action = actions.fetchAmuletsError(ids, 'messages.notFoundLong');

      expect(action).to.eql({
        type: 'FETCH_AMULETS_ERROR',
        payload: {
          ids,
          message: 'messages.notFoundLong',
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

    describe('when id is string', () => {
      it('should dispatch when id is "all"', () => {
        // Arrange
        const ids = ['all'];
        const action = actions.fetchAmulets(ids);

        // Act
        action(dispatch, getStore);

        // Assert
        expect(getFunc.firstCall.args[0]).to.eql(ids);
      });

      it('should error if any other string', () => {
        // Arrange
        const ids = ['balthazar'];
        const action = actions.fetchAmulets(ids);

        // Act
        action(dispatch, getStore);

        // Assert
        expect(getFunc).to.not.have.been.called;
      });
    });

    describe('when ids are actually complex objects', () => {
      it('should call service with them', () => {
        const ids = [{ id: 5 }, { id: 6 }];
        const action = actions.fetchAmulets(ids);

        action(dispatch, getStore);

        expect(getFunc.firstCall.args[0]).to.eql(ids);
      });

      it('should still filter ids that are already in the store', () => {
        const ids = [{ id: 5 }, { id: 1 }];
        const action = actions.fetchAmulets(ids);

        action(dispatch, getStore);

        expect(getFunc.firstCall.args[0]).to.eql([{ id: 5 }]);
      });

      it('should prioritise using calculatedId', () => {
        const ids = [{ id: 5 }, { calculatedId: 1, id: 3 }];
        const action = actions.fetchAmulets(ids);

        action(dispatch, getStore);

        expect(getFunc.firstCall.args[0]).to.eql([{ id: 5 }]);
      });
    });

    context('when all ids area already in the store', () => {
      it('should return immediately', () => {
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

        return action(dispatch, getStore)
          .then(() => {
            expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, 'messages.notFoundLong'));
          });
      });
    });

    context('when an error is thrown', () => {
      it('should dispatch all ids as errors', async () => {
        const ids = [10, 11, 12];
        const action = actions.fetchAmulets(ids);
        getFunc.withArgs(ids).rejects({});

        await expect(action(dispatch, getStore)).to.be.rejected;

        expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, 'messages.gw2ApiDown'));
      });

      it('should dispatch not found error', async () => {
        const ids = [10, 11, 12];
        const action = actions.fetchAmulets(ids);
        getFunc.withArgs(ids).rejects({ response: { status: 404 } });

        await expect(action(dispatch, getStore)).to.be.rejected;

        expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, 'messages.notFoundLong'));
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

        describe('items missing from the response', () => {
          it('should dispatch error', async () => {
            const ids = [10, 11, 12];
            action = actions.fetchAmulets(ids);
            getFunc.withArgs(ids).resolves({ 10: true, 11: true });

            await action(dispatch, getStore);

            expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError([12], 'messages.notFoundLong'));
          });

          it('should use calculated id if present', async () => {
            const ids = [{ id: 20 }, { calculatedId: 2020, id: 21 }];
            action = actions.fetchAmulets(ids);
            getFunc.withArgs(ids).resolves({ 20: true });

            await action(dispatch, getStore);

            expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError([2020], 'messages.notFoundLong'));
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
            return createErrorAction(404).catch(() => {
              expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, 'messages.notFoundLong'));
            });
          });
        });

        context('and it is anything else', () => {
          it('should dispatch an error under the item id', () => {
            return createErrorAction(500).catch(() => {
              expect(dispatch).to.have.been.calledWith(actions.fetchAmuletsError(ids, 'messages.gw2ApiDown'));
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

const sandbox = sinon.sandbox.create();
const get = sandbox.stub();
const set = sandbox.spy();

const SUBMIT_NOTIFICATION = 'SUBMIT_NOTIFICATION';
const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

const { default: reducer, defaultState } = proxyquire('features/App/app.reducer', {
  'lib/localStorage': {
    get,
    set,
  },
  './actions': {
    DISMISS_NOTIFICATION,
    SUBMIT_NOTIFICATION,
  },
}, true);

describe('app reducer', () => {
  describe('default state', () => {
    it('should be built correctly', () => {
      expect(defaultState).to.eql({
        notifications: {},
      });
    });
  });

  describe('reducer', () => {
    it('should return undefined for unhandled actions', () => {
      const state = reducer({}, '');

      expect(state).to.eql(undefined);
    });

    describe('notification dismissal', () => {
      it('should remote notification', () => {
        const state = {
          notifications: {
            cool: {},
            yeah: {},
          },
        };

        const newState = reducer(state, { payload: 'cool', type: DISMISS_NOTIFICATION });

        expect(newState).to.eql({
          notifications: {
            yeah: {},
          },
        });
      });
    });

    describe('notification adding', () => {
      it('should add notification', () => {
        const state = { notifications: {} };

        const newState = reducer(state, { payload: { neat: true, id: 'msg' }, type: SUBMIT_NOTIFICATION });

        expect(newState).to.eql({
          notifications: {
            msg: {
              id: 'msg',
              neat: true,
            },
          },
        });
      });

      context('when the notification is show once', () => {
        it('should add flag to ls', () => {
          const state = { notifications: {} };

          reducer(state, {
            payload: { neat: true, id: 'msg', showOnce: true },
            type: SUBMIT_NOTIFICATION,
          });

          expect(set).to.have.been.calledWith('notification:msg', 'true');
        });

        it('should not add to store if flag is set', () => {
          get.withArgs('notification:msg').returns('true');
          const state = { notifications: {} };

          const newState = reducer(state, {
            payload: { neat: true, id: 'msg', showOnce: true },
            type: SUBMIT_NOTIFICATION,
          });

          expect(newState).to.eql({ notifications: {} });
        });
      });
    });
  });
});

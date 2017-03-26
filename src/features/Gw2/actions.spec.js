describe('gw2 action factory', () => {
  describe('fetch thunk method', () => {
    it('should filter out ids that are already in the store', () => {

    });

    context('when there are no ids missing', () => {
      it('should return immediately if no ids are missing', () => {

      });
    });

    context('when there are ids missing', () => {
      it('should trigger a loading action when starting request', () => {

      });

      it('should batch up multiple calls and call implementation only once', () => {

      });

      describe('when successfully recieved data', () => {
        it('should dispatch loading action', () => {

        });

        it('should dispatch resolution action', () => {

        });

        context('when there is a after fetch hook', () => {
          it('should call after method', () => {

          });
        });
      });

      describe('when an error happens', () => {
        context('and it is a 404', () => {
          it('should dispatch an error under the item id', () => {

          });
        });

        context('and it is anything else', () => {
          it('should dispatch an error under the item id', () => {

          });
        });
      });
    });
  });

  describe('gw2 tooltip action', () => {
    it('should generate action', () => {

    });
  });
});

// @flow

declare var __DEVELOPMENT__: boolean;
declare var __webpack_public_path__: string;
declare function proxyquire (path: string, stubs?: {}): any;

type Leaderboard = {
  rows: Array<*>,
  offset: number,
  count: number,
  limit: number,
};

declare type ReduxState = {
  leaderboards: {
    pvp: {
      na: Leaderboard,
      eu: Leaderboard,
      gw2a: Leaderboard,
    },
  },
};

declare type GetState = () => ReduxState;

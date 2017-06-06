// @flow

import ResponsiveDisplayAd from './Responsive';

type Props = {
  className?: string,
};

const ResponsiveLeaderboard = ({ className }: Props) => (
  <ResponsiveDisplayAd
    className={className}
    breakpoints={[{
      type: 'leaderboard',
      maxWidth: Number.MAX_VALUE,
      minWidth: 728,
    }, {
      type: 'banner',
      maxWidth: 727,
      minWidth: 468,
    }, {
      type: 'mbanner',
      maxWidth: 467,
      minWidth: 0,
    }]}
  />
);

export default ResponsiveLeaderboard;

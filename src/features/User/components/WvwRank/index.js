// @flow

import reduce from 'lodash/reduce';
import get from 'lodash/get';
import T from 'i18n-react';

import Summary from 'common/layouts/Summary';
import Redacted from 'common/components/Redacted';
import rankToTitleMap from './rankToTitleMap.json';

type Props = {
  rank: number,
  worldId: number,
  worlds: Object,
}

const WvwRank = ({ rank, worldId, worlds }: Props) => {
  const world = worlds[worldId];
  const worldName = get(world, 'name');
  const redact = !rank;

  const rankName = (rank && reduce(rankToTitleMap, (selectedName, wvwRankName, wvwRank) => (
    rank >= wvwRank ? wvwRankName : selectedName
  ), '')) || '????';

  return (
    <Summary
      leftIcon={{ name: 'wvw.png', size: 'xlarge' }}
      title={
        <Redacted redact={redact}>{`WvW ${T.translate('words.rank')} (${rank || 1})`}</Redacted>
      }
      subTitle={<span><Redacted redact={redact}>{rankName}</Redacted> for {worldName}</span>}
    />
  );
};

export default WvwRank;

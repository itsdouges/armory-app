// @flow

import T from 'i18n-react';
import get from 'lodash/get';

import PvpGame from 'features/User/components/PvpGame';
import PvpStats from 'features/User/components/PvpStats';
import ContentCardList from 'common/components/ContentCardList';
import Container from 'common/components/Container';

type Props = {
  name: string,
  state: string,
  aggregate: {},
  ladders: {},
  games: [],
  maps: {},
  members: [],
};

const sortGamesByDate = (a, b) => {
  const aEnded = new Date(a.ended);
  const bEnded = new Date(b.ended);

  if (aEnded < bEnded) {
    return 1;
  }

  if (aEnded >= bEnded) {
    return -1;
  }

  return 0;
};

const Team = (props: Props) => (
  <span>
    <Container>
      <h2>{props.state} {props.name}</h2>
    </Container>

    <ContentCardList
      noBorder
      type="grid"
      resource="users"
      items={props.members}
    />

    <Container>
      <PvpStats
        stats={get(props, 'ladders.unranked')}
        title={T.translate('users.pvpStats.unranked')}
      />

      <PvpStats
        stats={get(props, 'ladders.ranked')}
        title={T.translate('users.pvpStats.ranked')}
      />

      {props.games
        .sort(sortGamesByDate)
        .map((game) => <PvpGame game={game} maps={props.maps} small />)}
    </Container>
  </span>
);

export default Team;

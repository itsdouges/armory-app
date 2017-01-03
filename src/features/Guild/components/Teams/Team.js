// @flow

import T from 'i18n-react';
import get from 'lodash/get';

import PvpGame from 'features/User/components/PvpGame';
import PvpStats from 'features/User/components/PvpStats';
import ContentCard from 'common/components/ContentCard';
import Card from 'common/components/Card';
import Grid from 'common/layouts/Grid';

import styles from './styles.less';

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
    <Card className={styles.teamRoot}>
      <div className={styles.teamHeader}>
        <h3>{props.name} ({props.state})</h3>
      </div>

      {<Grid columns="four">
        {props.members.map((member) => <ContentCard content={member} key={member.name} type="users" />)}
      </Grid>}

      <Grid>
        <PvpStats
          stats={get(props, 'ladders.unranked')}
          title={T.translate('users.pvpStats.unranked')}
        />

        <PvpStats
          stats={get(props, 'ladders.ranked')}
          title={T.translate('users.pvpStats.ranked')}
        />
      </Grid>

      <Grid columns="four">
        {props.games
          .sort(sortGamesByDate)
          .map((game) => <PvpGame key={game.id} game={game} maps={props.maps} small />)}
      </Grid>
    </Card>
  </span>
);

export default Team;

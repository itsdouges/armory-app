// @flow

import type { Gw2PvpGame, Gw2Map as Gw2MapType } from 'flowTypes';
import get from 'lodash/get';
import cx from 'classnames';
import T from 'i18n-react';
import { humanize } from 'lib/date';

import colours from 'common/styles/colours';
import styles from './styles.less';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import Gw2Map from 'common/components/Gw2Map';
import Redacted from 'common/components/Redacted';
import TooltipTrigger from 'common/components/TooltipTrigger';

function calculateProgressBar ({ team, scores }) {
  if (team === 'Red') {
    return {
      backgroundColor: colours._blue,
      barColor: colours._red,
      current: scores.red,
      max: scores.red + scores.blue,
    };
  }

  return {
    backgroundColor: colours._red,
    barColor: colours._blue,
    current: scores.blue,
    max: scores.red + scores.blue,
  };
}

type Props = {
  game?: Gw2PvpGame,
  maps: {
    [id: string]: Gw2MapType,
  },
};

const defaultGame = {
  map_id: '0',
  rating_type: 'Ranked',
  team: 'red',
  result: 'forfeit',
  scores: {
    red: 0,
    blue: 0,
  },
  profession: 'warrior',
  ended: '',
  started: '',
  rating_change: 0,
};

const PvpGame = ({ game = defaultGame, maps }: Props) => {
  const redacted = game.scores.red !== 0 && !game.scores.red;
  const map = get(maps, `[${game.map_id}]`, { id: game.map_id });

  const { current, max, barColor, backgroundColor } = calculateProgressBar(game);
  const ratingChangeStyle = game.rating_change >= 0 ? styles.positive : styles.negative;

  return (
    <Card className={styles.root}>
      <Gw2Map data={map} className={styles.map} />

      <div className={styles.inner}>
        <div className={styles.score}>
          <ProgressBar
            small
            current={current}
            max={max}
            barColor={barColor}
            backgroundColor={backgroundColor}
          />
        </div>

        <div className={cx(styles.column, styles.spreadItems)}>
          <div>
            <div className={styles.red}>RED</div>
            <Redacted redact={redacted}>{game.scores.red || '25'}</Redacted>
          </div>
          <div>
            <div className={styles.blue}>BLUE</div>
            <Redacted redact={redacted}>{game.scores.blue || '101'}</Redacted>
          </div>
        </div>

        <div className={cx(styles.column, styles.resultsContainer)}>
          <Icon size="medium" name={`${game.profession.toLowerCase()}-icon-small.png`} />
          <div className={cx(styles.result, styles[game.team.toLowerCase()])}>
            <Redacted redact={redacted}>{game.result.toUpperCase()}</Redacted>
          </div>
        </div>

        <div className={cx(styles.column, styles.stats, styles.spreadItems, styles.big)}>
          <TooltipTrigger data={game.rating_type}>
            <Icon name="ranked.png" className={cx(styles.rankIcon, game.rating_type === 'Ranked' && styles.ranked)}>
              {game.rating_change && <span className={cx(styles.ratingChange, ratingChangeStyle)}>
                {Math.abs(game.rating_change)}
              </span>}
            </Icon>
          </TooltipTrigger>

          <TooltipTrigger data={game.ended}>
            <time>
              <Redacted redact={redacted}>
                {T.translate('users.pvpStats.finished')} {humanize(game.ended) || 'Never'}
              </Redacted>
            </time>
          </TooltipTrigger>
        </div>
      </div>
    </Card>
  );
};

export default PvpGame;

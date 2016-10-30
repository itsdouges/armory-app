import { PropTypes } from 'react';
import get from 'lodash/get';
import cx from 'classnames';

import styles from './styles.less';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import Gw2Map from 'common/components/Gw2Map';
import Redacted from 'common/components/Redacted';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Tooltip from 'common/components/Tooltip';

function stringToDate (date) {
  return date && date.split('T')[0];
}

function calculateMatchInMinutes (start, end) {
  if (!start || !end) {
    return 0;
  }

  return new Date(new Date(end) - new Date(start)).getMinutes();
}

function calculateProgressBar ({ team, scores }) {
  if (team === 'Red') {
    return {
      backgroundColor: 'blue',
      barColor: 'red',
      current: scores.blue,
      max: scores.red + scores.blue,
    };
  }

  return {
    backgroundColor: 'red',
    barColor: 'blue',
    current: scores.red,
    max: scores.red + scores.blue,
  };
}

const PvpGame = ({ game, maps }) => {
  const redacted = game.scores.red !== 0 && !game.scores.red;
  const map = get(maps, `[${game.map_id}]`, { id: game.map_id });

  const { current, max, barColor, backgroundColor } = calculateProgressBar(game);

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
          <span className={cx(styles.rankIcon, game.rating_type === 'Ranked' && styles.ranked)}>
            <TooltipTrigger data={game.rating_type}>
              <Icon name="ranked.png" />
            </TooltipTrigger>
          </span>

          <div>
            <div>
              <Redacted redact={redacted}>
                {calculateMatchInMinutes(game.started, game.ended)} mins
              </Redacted>
            </div>
            <Redacted redact={redacted}>{stringToDate(game.ended) || '2016-05-19'}</Redacted>
          </div>
        </div>
      </div>

      <Tooltip />
    </Card>
  );
};

PvpGame.defaultProps = {
  game: {
    rating_type: 'Ranked',
    team: 'red',
    result: 'forfeit',
    scores: {},
    profession: 'warrior',
  },
};

PvpGame.propTypes = {
  game: PropTypes.object,
  season: PropTypes.object,
  maps: PropTypes.object,
};

export default PvpGame;

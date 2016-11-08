import { PropTypes } from 'react';
import get from 'lodash/get';
import cx from 'classnames';
import moment from 'moment';
import T from 'i18n-react';

import colours from 'common/styles/colours';
import styles from './styles.less';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import Gw2Map from 'common/components/Gw2Map';
import Redacted from 'common/components/Redacted';
import TooltipTrigger from 'common/components/TooltipTrigger';

function stringToDate (date) {
  const now = moment();
  const end = moment(date);
  const diffInMs = now.diff(end);

  return `${moment.duration(diffInMs).humanize()} ago`;
}

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

          <TooltipTrigger data={game.ended}>
            <div>
              <Redacted redact={redacted}>
                {T.translate('users.pvpStats.finished')} {stringToDate(game.ended) || 'Never'}
              </Redacted>
            </div>
          </TooltipTrigger>
        </div>
      </div>
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

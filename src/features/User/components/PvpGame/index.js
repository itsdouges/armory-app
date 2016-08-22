import { PropTypes } from 'react';
import styles from './styles.less';
import Card from 'common/components/Card';
import classnames from 'classnames/bind';
import Icon from 'common/components/Icon';
import Gw2Map from 'common/components/Gw2Map';
import Redacted from 'common/components/Redacted';

const cx = classnames.bind(styles);

function stringToDate (date) {
  return date && new Date(date).toLocaleDateString();
}

function calculateMatchInMinutes (start, end) {
  if (!start || !end) {
    return 0;
  }

  return new Date(new Date(end) - new Date(start)).getMinutes();
}

const PvpGame = ({ game }) => {
  const redacted = game.scores.red !== 0 && !game.scores.red;

  return (
    <Card className={styles.root}>
      <Gw2Map id={game.map_id} />

      <div className={styles.inner}>
        <div className={cx('column', 'resultsContainer')}>
          <Icon size="medium" name={`${game.profession.toLowerCase()}-icon-small.png`} />
          <div className={cx('result', game.team.toLowerCase())}>
            <Redacted redact={redacted}>{game.result.toUpperCase()}</Redacted>
          </div>
        </div>

        <div className={cx('column', ', stretch', 'spreadItems')}>
          <div>
            <div className={styles.red}>RED</div>
            <Redacted redact={redacted}>{game.scores.red || '25'}</Redacted>
          </div>
          <div>
            <div className={styles.blue}>BLUE</div>
            <Redacted redact={redacted}>{game.scores.blue || '101'}</Redacted>
          </div>
        </div>

        <div className={cx('column', 'stats', 'spreadItems', 'big')}>
          <div>
            <Redacted redact={redacted}>
              <span className={styles[game.rating_type.toLowerCase()]}>
                {game.rating_type.toUpperCase()}
              </span>
            </Redacted>
          </div>

          <div>
            <div>
              <Redacted redact={redacted}>
                {calculateMatchInMinutes(game.started, game.ended)} minutes
              </Redacted>
            </div>
            <Redacted redact={redacted}>{stringToDate(game.ended) || '14/12/2016'}</Redacted>
          </div>
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
};

export default PvpGame;

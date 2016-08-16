import { PropTypes } from 'react';
import styles from './styles.less';
import Card from 'common/components/Card';
import classnames from 'classnames/bind';
import Icon from 'common/components/Icon';
import Gw2Map from 'common/components/Gw2Map';

const cx = classnames.bind(styles);

function stringToDate (date) {
  return date && new Date(date).toDateString();
}

function calculateMatchInMinutes (start, end) {
  return start && end && new Date(new Date(end) - new Date(start)).getMinutes();
}

const PvpGame = ({ game }) => (
  <Card className={styles.root}>
    <Gw2Map id={game.map_id} />

    <div className={styles.inner}>
      <div className={cx('column', 'medium')}>
        <Icon size="medium" name={`${game.profession.toLowerCase()}-icon-small.png`} />
        <div className={cx('result', game.team.toLowerCase())}>
          {game.result.toUpperCase()}
        </div>
      </div>
      <div className={cx('stretch', 'spreadItems')}>
        <div>
          <div className={styles.red}>RED</div>
          <div>{game.scores.red || '25'}</div>
        </div>
        <div>
          <div className={styles.blue}>BLUE</div>
          <div>{game.scores.blue || '101'}</div>
        </div>
      </div>
      <div className={cx('stats', 'spreadItems', 'big')}>
        <div>
          <div>{game.rating_type}</div>
        </div>
        <div>
          <div>{calculateMatchInMinutes(game.started, game.ended) || 0} minutes</div>
          <div>{stringToDate(game.ended) || 'Groundhog Day'}</div>
        </div>
      </div>
    </div>
  </Card>
);

PvpGame.defaultProps = {
  game: {
    rating_type: 'Ranked',
    team: 'red',
    result: 'forfeit',
    scores: {},
    profession: 'necromancer',
  },
};

PvpGame.propTypes = {
  game: PropTypes.object,
  season: PropTypes.object,
};

export default PvpGame;

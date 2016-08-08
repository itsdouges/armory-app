import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Portrait = ({ character = {} }) => (
  <div
    className={cx('root', 'portraitBgDefault', character.race && character.race.toLowerCase())}
  >
    <div className={cx('portraitTopIn', 'borderStrip1')} />
    <div className={cx('portraitBottomIn', 'borderStrip2')} />
  </div>
);

Portrait.propTypes = {
  character: PropTypes.object,
};

export default Portrait;

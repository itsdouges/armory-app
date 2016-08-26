import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
import config from 'env';

const cx = classnames.bind(styles);

const endpoint = config.imagesEndpoint;

/* eslint max-len:0 */
const Portrait = ({ character = {}, forceUpdate }) => (
  <div
    className={cx('root', 'portraitBgDefault', character.race && character.race.toLowerCase())}
  >
    <div className={cx('portraitTopIn', 'borderStrip1')} />
    <div
      className={styles.portrait}
      style={{
        backgroundImage: `url(${endpoint}${character.alias}/characters/${character.name}${forceUpdate ? `?${+new Date()}` : ''})`,
      }}
    />
    <div className={cx('portraitBottomIn', 'borderStrip2')} />
  </div>
);

Portrait.propTypes = {
  character: PropTypes.object,
  forceUpdate: PropTypes.bool,
};

export default Portrait;

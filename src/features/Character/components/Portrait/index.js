import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
import config from 'config';

const cx = classnames.bind(styles);

const endpoint = config.imagesEndpoint;

/* eslint max-len:0 */
const Portrait = ({ character = {}, forceUpdate, children, className }) => (
  <div
    className={cx('root',
      'portraitBgDefault',
      character.race && character.race.toLowerCase()
    )}
  >
    <div className={cx('portraitTopIn', 'borderStrip1')} />
    <div
      className={cx(styles.portrait, className)}
      style={{
        backgroundImage: encodeURI(`url(${endpoint}${character.alias}/characters/${character.name}${forceUpdate ? `?${+new Date()}` : ''})`),
      }}
    />
    <div className={cx('portraitBottomIn', 'borderStrip2')} />
    {children}
  </div>
);

Portrait.propTypes = {
  className: PropTypes.string,
  character: PropTypes.object,
  forceUpdate: PropTypes.bool,
  children: PropTypes.any,
};

export default Portrait;

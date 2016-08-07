import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Avatar = ({ alias, img, size }) => (
  <div title={alias} className={styles.root}>
    <img
      alt={alias}
      className={cx('image', size)}
      src={img}
    />

    <h2 className={styles.name}>
      <strong>{alias || <span className={styles.placeholder}>'loading...'</span>}</strong>
    </h2>
  </div>
);

Avatar.propTypes = {
  alias: PropTypes.string,
  size: PropTypes.string,
  img: PropTypes.string,
};

export default Avatar;

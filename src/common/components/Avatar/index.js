import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
import noImage from 'assets/images/quaggan-sad.png';
const cx = classnames.bind(styles);

const Avatar = ({ name, img, size }) => (
  <div className={styles.root}>
    <img
      alt={name}
      className={cx('image', size)}
      src={img || noImage}
    />

    <h2 className={styles.name}>
      <strong>{name || <span className={styles.placeholder}>loading...</span>}</strong>
    </h2>
  </div>
);

Avatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  img: PropTypes.string,
};

export default Avatar;

import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Placeholder = ({ className, size = 'small' }) => (
  <div className={cx('placeholderRoot', className, size)}>
    <div className={cx('image', 'placeholder')} />
    <div className={styles.textContainer}>
      <div className={cx('title', 'placeholder')}>Loading...</div>
      <div className={cx('subTitle', 'placeholder')}>Hampsters are working...</div>
    </div>
  </div>
);

Placeholder.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'big']),
};

export default Placeholder;

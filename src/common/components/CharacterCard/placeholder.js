import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Placeholder = ({ className }) => (
  <div className={cx('placeholderRoot', className)}>
    <div className={cx('image', 'placeholder')} />
    <div className={styles.textContainer}>
      <div className={cx('title', 'placeholder')}>loading...</div>
      <div className={cx('subTitle', 'placeholder')}>loading...</div>
    </div>
  </div>
);

Placeholder.propTypes = {
  className: PropTypes.string,
};

export default Placeholder;

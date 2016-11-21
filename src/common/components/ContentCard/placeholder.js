// @flow

import styles from './styles.less';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

type PlaceholderProps = {
  className?: string,
  size?: 'small' | 'big',
};

const Placeholder = ({ className, size = 'small' }: PlaceholderProps) => (
  <div className={cx('placeholderRoot', className, size)}>
    <div className={cx('image', 'placeholder')} />
    <div className={styles.textContainer}>
      <div className={cx('title', 'placeholder')}>Loading...</div>
      <div className={cx('subTitle', 'placeholder')}>Hampsters are working...</div>
    </div>
  </div>
);

export default Placeholder;

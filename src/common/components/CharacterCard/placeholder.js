import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Placeholder = () => (
  <div className={styles.container}>
    <div className={cx('image', 'placeholder')} />
    <div className={styles.textContainer}>
      <div className={cx('title', 'placeholder')} />
      <div className={cx('subTitle', 'placeholder')} />
    </div>
  </div>
);

export default Placeholder;

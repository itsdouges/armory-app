import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Item = ({ type, busy, item = {}, skin = {} }) => (
  <div className={cx('root', 'containerDefault', `${type}Icon`, { busy })}>
    <div className={styles.item} style={{ backgroundImage: `url(${skin.icon || item.icon})` }} />
  </div>
);

Item.propTypes = {
  slotName: PropTypes.string,
  type: PropTypes.string,
  showTooltip: PropTypes.func,
  busy: PropTypes.bool,
  item: PropTypes.object,
  skin: PropTypes.object,
};

export default Item;

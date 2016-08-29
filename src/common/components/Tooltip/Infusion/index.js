import { PropTypes } from 'react';
import styles from './styles.less';
import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';
import cx from 'classnames';

const ItemInfusion = ({ data, data: {
  name,
  icon,
  details: { infix_upgrade: { buff: { description } } } },
}) => {
  if (!data) {
    return (
      <div>
        <span className={styles.icon}></span>
        <span>Unused Infusion Slot</span>
      </div>
    );
  }

  return (
    <div className={cx(styles.root, colours.blue)}>
      <div>
        <Icon src={icon} size="micro" />
        <span> {name}</span>
      </div>

      <div>{description.map((descrip) => <div key={descrip}>{descrip}</div>)}</div>
    </div>
  );
};

ItemInfusion.propTypes = {
  data: PropTypes.object,
};

export default ItemInfusion;

import { PropTypes } from 'react';
import styles from './styles.less';
import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';

const ItemUpgrade = ({ data, count: { count } }) => {
  const upgradeSlotUsed = !!data;

  if (!upgradeSlotUsed) {
    return (
      <div>
        <span className={styles.icon}></span>
        <span>Unused Upgrade Slot</span>
      </div>
    );
  }

  const withBonus = !!data.details.bonuses;
  const withBuffs = !!data.details.infix_upgrade.buff;

  return (
    <div className={styles.root}>
      <div className={colours.blue}>
        <Icon src={data.icon} size="micro" />
        <span className={styles.summaryContainer}>
          {data.name}
          {withBonus && ` (${count || 0}/${data.details.bonuses.length})`}
        </span>
      </div>

      {withBonus && data.details.bonuses.map((bonus, index) =>
        <div key={index} className={index < count && colours.blue}>
          {`(${index + 1}): ${bonus}`}
        </div>)}

      {withBuffs && data.details.infix_upgrade.buff.description.map((buff, index) =>
        <div key={index} className={colours.blue}>{buff}</div>)}
    </div>
  );
};

ItemUpgrade.propTypes = {
  data: PropTypes.object,
  count: PropTypes.object,
};

export default ItemUpgrade;

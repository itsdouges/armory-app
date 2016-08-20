import { PropTypes } from 'react';
import styles from './styles.less';
import colours from 'common/styles/colours.less';

const ItemUpgrade = ({ data }) => {
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
        <span style={{ backgroundImage: `url(${data.icon})` }} />
        <span>
          {data.name}
          {withBonus && ` (${data.upgrade_combo_count || 0}/${data.details.bonuses.length})`}
        </span>
      </div>

      {withBonus && data.details.bonuses.map((bonus, index) =>
        <div key={index} className={index < data.upgrade_combo_count && colours.blue}>
          {`(${index + 1}): ${bonus}`}
        </div>)}

      {withBuffs && data.details.infix_upgrade.buff.description.map((buff, index) =>
        <div key={index} className={colours.blue}>{buff}</div>)}
    </div>
  );
};

ItemUpgrade.propTypes = {
  data: PropTypes.object,
};

export default ItemUpgrade;

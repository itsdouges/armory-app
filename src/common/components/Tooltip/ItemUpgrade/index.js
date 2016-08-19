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
        <span>{data.name}</span>
        <span>
          {withBonus && `(${data.upgrade_combo_count}/${data.details.bonuses.length})`}
        </span>
      </div>

      {withBonus && data.details.bonuses.map((bonus, index) =>
        <span className={index < data.upgrade_combo_count && colours.blue}>
          {`(${index + 1}): ${bonus}`}
        </span>)}

      {withBuffs && data.upgrade.details.infix_upgrade.buff.description.map((buff) =>
        <div className={colours.blue}>{buff}</div>)}
    </div>
  );
};

ItemUpgrade.propTypes = {
  data: PropTypes.object,
};

export default ItemUpgrade;

import { PropTypes } from 'react';
import styles from './styles.less';
import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';
import { markup } from 'lib/gw2/parse';

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
  const upgradeOverflow = withBonus && count > data.details.bonuses.length;

  return (
    <div className={styles.root}>
      <div className={colours.blue}>
        <Icon src={data.icon} size="micro" />
        <span className={styles.summaryContainer}>
          {`${data.name} `}
          {withBonus &&
            <span>
              (<span className={upgradeOverflow && styles.overflowRunes}>
                {`${count || 0}/${data.details.bonuses.length}`}
              </span>)
            </span>}
        </span>
      </div>

      {withBonus && data.details.bonuses.map((bonus, index) =>
        <div key={index} className={index < count && colours.blue}>
          {`(${index + 1}):`}{markup(bonus)}
        </div>)}

      {withBuffs && data.details.infix_upgrade.buff.description.map((buff, index) =>
        <div key={index} className={colours.blue}>{markup(buff)}</div>)}
    </div>
  );
};

ItemUpgrade.propTypes = {
  data: PropTypes.object,
  count: PropTypes.object,
};

export default ItemUpgrade;

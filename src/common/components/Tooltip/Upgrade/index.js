// @flow

import React from 'react';
import styles from './styles.less';
import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';
import { markup } from 'lib/gw2/parse';

type Props = {
  data: {
    icon: string,
    name: string,
    details: {
      bonuses: [],
      infix_upgrade: {
        buff: {
          description: [],
        },
      },
    },
  },
  count: {
    count: number,
  },
};

const ItemUpgrade = ({ data, count: { count } }: Props) => {
  if (typeof data !== 'object') {
    // Dirty hack to back out if data isn't an object.
    // It won't be an object if the item hasn't been parsed with
    // loaded data (its just a number)
    return null;
  }

  const upgradeSlotUsed = !!data;

  if (!upgradeSlotUsed) {
    return (
      <div>
        <span className={styles.icon} />
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
          {withBonus && (
            <span>
              (
              <span className={upgradeOverflow && styles.overflowRunes}>
                {`${count || 0}/${data.details.bonuses.length}`}
              </span>
              )
            </span>
          )}
        </span>
      </div>

      {withBonus &&
        data.details.bonuses.map((bonus, index) => (
          <div key={bonus} className={index < count && colours.blue}>
            {`(${index + 1}):`} {markup(bonus)}
          </div>
        ))}

      {withBuffs &&
        data.details.infix_upgrade.buff.description.map(buff => (
          <div key={buff} className={colours.blue}>
            {markup(buff)}
          </div>
        ))}
    </div>
  );
};

ItemUpgrade.defaultProps = {
  count: {},
};

export default ItemUpgrade;

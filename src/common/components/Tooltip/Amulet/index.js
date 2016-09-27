import { PropTypes } from 'react';

import colours from 'common/styles/colours.less';
import SimpleTooltip from '../Simple';
import Icon from 'common/components/Icon';
import Background from '../Background';
import styles from './styles.less';

const AmuletTooltip = ({ data: { item: { name, icon, attributes } } }) => {
  if (!name) {
    return <Background><SimpleTooltip data="No Amulet Selected" /></Background>;
  }

  return (
    <Background>
      <SimpleTooltip data="Currently Equipped" />

      <div className={styles.itemHeader}>
        <Icon size="mini" src={icon} className={styles.tooltipIcon} />
        <span className={styles.itemName}>{name}</span>
      </div>

      <div className={colours.green}>
        {Object.entries(attributes)
          .map(([attrName, value, index]) => <div key={index}>{`+${value} ${attrName}`}</div>)}
      </div>
    </Background>
  );
};

AmuletTooltip.propTypes = {
  data: PropTypes.object,
};

export default AmuletTooltip;

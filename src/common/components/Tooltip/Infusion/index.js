import { PropTypes } from 'react';
import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';

const ItemInfusion = ({ data, data: {
  name,
  icon,
  details: { infix_upgrade: { buff: { description } } } },
}) => {
  if (!data) {
    return (
      <div>
        <span>Unused Infusion Slot</span>
      </div>
    );
  }

  return (
    <div className={colours.blue}>
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

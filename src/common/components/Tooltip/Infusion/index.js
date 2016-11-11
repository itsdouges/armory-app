// @flow

import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';

type Props = {
  data: {
    name: string,
    icon: string,
    details: {
      infix_upgrade: {
        buff: {
          description: Array<string>,
        },
      },
    },
  },
};

const ItemInfusion = ({ data, data: {
  name,
  icon,
  details: { infix_upgrade: { buff: { description } } } },
}: Props) => {
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

export default ItemInfusion;

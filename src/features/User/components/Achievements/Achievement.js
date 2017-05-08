// @flow

import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';

type Props = {
  achievement: {
    name: string,
    description: string,
  },
  icon: string,
};

const Achievement = ({ achievement, icon }: Props) => (
  <TooltipTrigger data={achievement} type="achievement">
    <div>
      <Icon src={icon} />

      {achievement.name}
    </div>
  </TooltipTrigger>
);

export default Achievement;

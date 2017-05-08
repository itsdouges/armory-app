// @flow

import type { Children } from 'react';

type Props = {
  name: string,
  className?: string,
  icon?: Children,
  onClick?: () => void,
};

const AchievementCategory = ({ name, icon, className, onClick }: Props) => (
  <button className={className} onClick={onClick}>
    {icon} {name}
  </button>
);

export default AchievementCategory;

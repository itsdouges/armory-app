// @flow

type Props = {
  name: string,
  className?: string,
};

const AchievementCategory = ({ name, className }: Props) => (
  <div className={className}>
    {name}
  </div>
);

export default AchievementCategory;

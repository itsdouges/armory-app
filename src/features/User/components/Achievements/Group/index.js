// @flow

import type { AchievementCategories } from 'flowTypes';

import cx from 'classnames';
import SvgIcon from 'common/components/Icon/Svg';
import Icon from 'common/components/Icon';

import Category from '../Category';
import styles from './styles.less';

type Props = {
  name: string,
  categories: Array<number>,
  categoryData: AchievementCategories,
  selected: boolean,
  onClick: () => void,
  onCategoryClick: (id: number) => void,
  selectedCategory: number,
  groups: Array<*>,
  userAchievements: { [number]: any },
};

const AchievementGroup = ({
  name,
  categories,
  categoryData,
  selected,
  onClick,
  onCategoryClick,
  selectedCategory,
}: Props) => {
  const totalAchievementsInGroup = categories.reduce((total, id) => {
    const category = categoryData[id] || {};
    return category && category.achievements
      ? total + category.achievements.length
      : total;
  }, 0);

  return (
    <div className={cx({ [styles.selected]: selected })}>
      <Category
        selected={selected}
        onClick={onClick}
        name={name}
        rightComponent={totalAchievementsInGroup}
        icon={<SvgIcon name="arrow-down" className={styles.icon} />}
      />

      <ol className={styles.categories}>
        {categories.map((id) => {
          const category = categoryData[id] || {};
          if (!category.achievements || !category.achievements.length) {
            return null;
          }

          return (
            <li key={id}>
              <Category
                subCategory
                name={category.name}
                rightComponent={categories && category.achievements.length}
                icon={<Icon src={category.icon} />}
                selected={selectedCategory === id}
                onClick={() => onCategoryClick(id)}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AchievementGroup;

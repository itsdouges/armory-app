// @flow

import type { AchievementCategories } from 'flowTypes';

import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import SvgIcon from 'common/components/Icon/Svg';
import Icon from 'common/components/Icon';

import Category from '../Category';
import styles from './styles.less';

import { DEFAULT_CATEGORY_ID } from '../CategoryPage';

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

function extractTotals (categories, categoryData, userAchievements) {
  const totals = {};
  let totalCompleted = 0;

  const totalAchievements = categories.reduce((total, id) => {
    const category = categoryData[id];
    if (!category) {
      return total;
    }

    totals[category.id] = category.achievements.reduce((completed, achievementId) => {
      const achievement = userAchievements[achievementId];
      if (achievement && achievement.done) {
        totalCompleted += 1;
        return completed + 1;
      }

      return completed;
    }, 0);

    return total + category.achievements.length;
  }, 0);

  return {
    totalCompleted,
    totalAchievements,
    categoryCompletedMap: totals,
  };
}

const AchievementGroup = ({
  basePath,
  name,
  categories,
  categoryData,
  selected,
  onClick,
  selectedCategory,
  userAchievements,
}: Props) => {
  const {
    totalCompleted,
    totalAchievements,
    categoryCompletedMap,
  } = extractTotals(categories, categoryData, userAchievements);

  const groupTally = !!totalAchievements && `${totalCompleted}/${totalAchievements}`;

  return (
    <div className={cx({ [styles.selected]: selected })}>
      <Category
        onClick={onClick}
        selected={selected}
        name={name}
        rightComponent={groupTally}
        icon={<SvgIcon name="arrow-down" className={styles.icon} />}
      />

      <ol className={styles.categories}>
        {categories.map((id) => {
          const category = categoryData[id] || {};
          const achievementCount = categories && category.achievements && category.achievements.length;
          if (achievementCount === 0) {
            return null;
          }

          const categoryTally = !!achievementCount && `${categoryCompletedMap[id] || 0}/${achievementCount}`;
          const categoryPath = DEFAULT_CATEGORY_ID === id ? '' : `/${id}`;

          return (
            <li key={id} style={{ order: category.order }}>
              <Category
                to={`${basePath}${categoryPath}`}
                subCategory
                name={category.name}
                rightComponent={categoryTally}
                icon={<Icon src={category.icon} />}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AchievementGroup;

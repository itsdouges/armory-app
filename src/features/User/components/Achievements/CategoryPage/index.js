// @flow

import type { AchievementCategories, Achievements, UserAchievementsMap } from 'flowTypes';

import { PureComponent } from 'react';
import { makeStubItems } from 'lib/paginator';
import Icon from 'common/components/Icon';
import colourMap from 'assets/categoryColourMap.json';

import Achievement from '../Achievement';
import styles from './styles.less';

const emptyAchievements = makeStubItems(24).rows;

type Props = {
  fetchAchievements: (Array<number>) => Promise<*>,
  categories: AchievementCategories,
  achievements: Achievements,
  userAchievements: UserAchievementsMap,
  categoryId: number,
};

export default class CategoryPage extends PureComponent {
  props: Props;

  componentWillMount () {
    this.fetchData();
  }

  componentWillReceiveProps (nextProps: Props) {
    const currentCategory = this.props.categories[this.props.categoryId];
    const nextCategory = nextProps.categories[nextProps.categoryId];

    if (currentCategory !== nextCategory) {
      this.fetchData(nextProps);
    }
  }

  fetchData (props: Props = this.props) {
    const { categories, categoryId } = props;

    const category = categories[categoryId];
    category && props.fetchAchievements(category.achievements);
  }

  render () {
    const { categories, achievements, userAchievements } = this.props;

    const category = categories[this.props.categoryId] || { achievements: emptyAchievements, icon: '' };
    const colour = colourMap[this.props.categoryId];

    return (
      <div className={styles.achievementsContainer}>
        <div className={styles.categoryStrap}>
          <Icon size="small" src={category.icon} />
          <h3 className={styles.categoryName}>
            {category.name || <span className={styles.loading}>Loading Category...</span>}
          </h3>
        </div>

        <ol className={styles.achievements}>
          {category.achievements.map((id, index) => (
            <li key={id || index} className={styles.achievement}>
              <Achievement
                icon={category.icon}
                achievement={achievements[id]}
                colour={colour}
                {...userAchievements[id]}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

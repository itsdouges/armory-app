// @flow

import { Component } from 'react';
import { makeStubItems } from 'lib/paginator';
import Icon from 'common/components/Icon';
import colourMap from 'assets/categoryColourMap.json';
import Achievement from '../Achievement';

import styles from './styles.less';

const emptyAchievements = makeStubItems(24).rows;
export const DEFAULT_CATEGORY_ID = 97; // Basic category

type Props = {};

export default class CategoryPage extends Component {
  props: Props;

  getCategoryId (props = this.props) {
    return props.match ? props.match.params.categoryId : DEFAULT_CATEGORY_ID;
  }

  componentWillMount () {
    this.fetchData();
  }

  componentWillReceiveProps (nextProps) {
    const currentCategory = this.props.categories[this.getCategoryId()];
    const nextCategory = nextProps.categories[this.getCategoryId(nextProps)];

    if (currentCategory !== nextCategory) {
      this.fetchData(nextProps);
    }
  }

  fetchData (props = this.props) {
    const { categories } = props;
    const categoryId = this.getCategoryId(props);

    const category = categories[categoryId];
    category && props.fetchAchievements(category.achievements);
  }

  render () {
    const { categories, achievements, userAchievements } = this.props;

    const categoryId = this.getCategoryId();
    const category = categories[categoryId] || { achievements: emptyAchievements, icon: '' };
    const colour = colourMap[categoryId];

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

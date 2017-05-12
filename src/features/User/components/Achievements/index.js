// @flow

import type { AchievementGroups, AchievementCategories, Achievements, UserAchievementsMap } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { createSelector } from 'reselect';
import T from 'i18n-react';

import extractColour from 'lib/colour';
import actions from 'features/Gw2/actions';
import Container from 'common/components/Container';
import Textbox from 'common/components/Textbox';
import colourMap from 'assets/categoryColourMap.json';
import Card from 'common/components/Card';

import Group from './Group';
import Achievement from './Achievement';
import styles from './styles.less';

export const selector = createSelector(
  (state) => (state.users.data[state.users.selected] || {}).achievementsMap || {},
  (state) => state.achievements,
  (state) => state.achievementGroups,
  (state) => state.achievementCategories,
  (userAchievements, achievements, groups, categories) => ({
    userAchievements,
    achievements,
    groups,
    categories,
  })
);

type Props = {
  fetchAchievementGroups: () => Promise<*>,
  fetchAchievementCategories: () => Promise<*>,
  fetchAchievements: (Array<number>) => Promise<*>,
  groups: AchievementGroups,
  categories: AchievementCategories,
  achievements: Achievements,
  userAchievements: UserAchievementsMap,
};

type State = {
  selectedCategory: number,
  selectedGroup: ?string,
};

export default connect(selector, {
  fetchAchievementGroups: actions.fetchAchievementGroups,
  fetchAchievementCategories: actions.fetchAchievementCategories,
  fetchAchievements: actions.fetchAchievements,
})(
class UserAchievements extends Component {
  props: Props;
  state: State = {
    selectedCategory: 97, // 69, // Daily category
    selectedGroup: '18DB115A-8637-4290-A636-821362A3C4A8', // '56A82BB9-6B07-4AB0-89EE-E4A6D68F5C47', // Daily group
  };

  componentWillMount () {
    const { selectedCategory } = this.state;

    this.props.fetchAchievementGroups('4E6A6CE7-B131-40BB-81A3-235CDBACDAA9');
    this.props.fetchAchievementCategories(1)
      .then((categoryMap) => this.props.fetchAchievements(categoryMap[selectedCategory].achievements));
  }

  selectCategory = (id) => {
    const { categories } = this.props;

    this.props.fetchAchievements(categories[id].achievements);

    this.setState({
      selectedCategory: id,
    });
  };

  selectGroup = (id) => {
    this.setState((prevState) => ({
      selectedGroup: prevState.selectedGroup === id ? null : id,
    }));
  };

  render () {
    const { groups, achievements, categories, userAchievements } = this.props;
    const { selectedCategory, selectedGroup } = this.state;
    const category = categories[selectedCategory] || { achievements: [], icon: '' };

    const colour = colourMap[selectedCategory];
    const orderedGroups = map(groups, (value) => (value.id ? value : null))
      .filter(Boolean)
      .sort(({ order: a }, { order: b }) => (a - b));

    return (
      <Container className={styles.root}>
        <div className={styles.groups}>
          <Textbox
            containerClassName={styles.textbox}
            id="achievements-filter"
            label={`${T.translate('search.name')}...`}
          />

          <ol>
            {orderedGroups.map((group) =>
              <li key={group.id}>
                <Group
                  userAchievements={userAchievements}
                  categoryData={categories}
                  onClick={() => this.selectGroup(group.id)}
                  onCategoryClick={this.selectCategory}
                  selected={selectedGroup === group.id}
                  selectedCategory={selectedCategory}
                  {...group}
                />
              </li>)}
          </ol>
        </div>

        <div className={styles.achievementsContainer}>
          <Card className={styles.categoryStrap} style={{ backgroundColor: extractColour(colour, 0.6) }}>
            <h3 className={styles.categoryName}>{category.name || '...'}</h3>
          </Card>

          <ol className={styles.achievements}>
            {category.achievements.map((id) =>
              <li key={id} className={styles.achievement}>
                <Achievement
                  icon={category.icon}
                  achievement={achievements[id]}
                  colour={colour}
                  {...userAchievements[id]}
                />
              </li>)}
          </ol>
        </div>
      </Container>
    );
  }
}
);

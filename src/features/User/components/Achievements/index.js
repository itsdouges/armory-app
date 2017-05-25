// @flow

import type { AchievementGroups, AchievementCategories, Achievements, UserAchievementsMap } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import T from 'i18n-react';
import { Route, Switch } from 'react-router-dom';

import { makeStubItems } from 'lib/paginator';
import Icon from 'common/components/Icon';
import actions from 'features/Gw2/actions';
import Container from 'common/components/Container';
import Textbox from 'common/components/Textbox';
import colourMap from 'assets/categoryColourMap.json';

import Group from './Group';
import Achievement from './Achievement';
import styles from './styles.less';

const emptyAchievements = makeStubItems(24).rows;

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

const DAILY_GROUP_ID = '18DB115A-8637-4290-A636-821362A3C4A8';
const DAILY_CATEGORY_ID = 97;

export default connect(selector, {
  fetchAchievementGroups: actions.fetchAchievementGroups,
  fetchAchievementCategories: actions.fetchAchievementCategories,
  fetchAchievements: actions.fetchAchievements,
})(
class UserAchievements extends Component {
  props: Props;
  state: State = {
    selectedCategory: DAILY_CATEGORY_ID,
    selectedGroup: DAILY_GROUP_ID,
  };

  componentWillMount () {
    const { selectedCategory } = this.state;

    this.props.fetchAchievementGroups(['all'])
      .then((groups) => {
        const dailyGroup = groups[DAILY_GROUP_ID];

        const ids = reduce(groups, (arr, value) => arr.concat(value.categories), []);

        return this.props.fetchAchievementCategories(
          ids,
          dailyGroup.categories
        );
      })
      .then((categories) => {
        const category = categories[selectedCategory];
        category && this.props.fetchAchievements(category.achievements);
      });
  }

  selectCategory = (id) => {
    const { categories } = this.props;

    this.props.fetchAchievements(categories[id].achievements);

    // this.setState({
    //   selectedCategory: id,
    // });
  };

  selectGroup = (id) => {
    this.setState((prevState) => ({
      selectedGroup: prevState.selectedGroup === id ? null : id,
    }));
  };

  render () {
    const { groups, achievements, categories, userAchievements } = this.props;
    const { selectedCategory, selectedGroup } = this.state;
    // const category = categories[this.props.match.params.category] || { achievements: emptyAchievements, icon: '' };

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
                  basePath={this.props.match.url}
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

        <Switch>
          {orderedGroups.map((group) => {
            if (!group) {
              return null;
            }

            return group.categories.map((categoryId) => (
              <Route
                exact
                key={`${this.props.match.url}/${categoryId}`}
                path={`${this.props.match.url}/${categoryId}`}
                render={() => {
                  const category = categories[categoryId] || { achievements: emptyAchievements, icon: '' };

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
                }}
              />
            ));
          }).reduce((arr, group) => arr.concat(group), [])}
        </Switch>
      </Container>
    );
  }
}
);

// @flow

import type { AchievementGroups, AchievementCategories, Achievements, UserAchievementsMap } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import T from 'i18n-react';
import { Route } from 'react-router-dom';

import actions from 'features/Gw2/actions';
import Container from 'common/components/Container';
import Textbox from 'common/components/Textbox';

import CategoryPage from './CategoryPage';
import Group from './Group';
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
  selectedGroup: ?string,
};

const DAILY_GROUP_ID = '18DB115A-8637-4290-A636-821362A3C4A8';

export default connect(selector, {
  fetchAchievementGroups: actions.fetchAchievementGroups,
  fetchAchievementCategories: actions.fetchAchievementCategories,
  fetchAchievements: actions.fetchAchievements,
})(
class UserAchievements extends Component {
  props: Props;
  state: State = {
    selectedGroup: DAILY_GROUP_ID,
  };

  componentWillMount () {
    this.props.fetchAchievementGroups(['all'])
      .then((groups) => {
        const dailyGroup = groups[DAILY_GROUP_ID];

        const ids = reduce(groups, (arr, value) => arr.concat(value.categories), []);

        return this.props.fetchAchievementCategories(
          ids,
          dailyGroup.categories
        );
      });
  }

  selectGroup = (id) => {
    this.setState((prevState) => ({
      selectedGroup: prevState.selectedGroup === id ? null : id,
    }));
  };

  render () {
    const { groups, achievements, categories, userAchievements } = this.props;
    const { selectedGroup } = this.state;

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
                  selected={selectedGroup === group.id}
                  {...group}
                />
              </li>)}
          </ol>
        </div>

        <Route path={`${this.props.match.url}/:categoryId`}>
          {(props) => (
            <CategoryPage
              {...props}
              categories={categories}
              achievements={achievements}
              userAchievements={userAchievements}
              fetchAchievements={this.props.fetchAchievements}
              fetchAchievementGroups={this.props.fetchAchievementGroups}
            />
          )}
        </Route>
      </Container>
    );
  }
}
);

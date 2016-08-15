import styles from './styles.less';
import CharactersList from 'common/components/CharactersList';
import ContentCard from 'common/components/ContentCard';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './users.reducer';
import SocialButtons from 'common/components/SocialButtons';
import PvpStats from './components/PvpStats';

import {
  fetchUser,
  selectUser,
} from './actions';

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
  };

  static contextTypes = {
    userAlias: PropTypes.string,
  };

  componentWillMount () {
    const alias = this.props.routeParams.alias;

    this.props.dispatch(fetchUser(alias));
    this.props.dispatch(selectUser(alias));
  }

  render () {
    const { user, routeParams: { alias } } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.inner}>
          <ContentCard content={user} size="big" type="users" />
        </div>

        <CharactersList
          type="grid"
          alias={alias}
          characters={user && user.characters}
        />

        <PvpStats stats={user && user.pvpStats} />

        <SocialButtons />
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
};

export default connect(selector)(User);

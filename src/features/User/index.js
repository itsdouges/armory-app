import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import ContentCard from 'common/components/ContentCard';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './users.reducer';
import SocialButtons from 'common/components/SocialButtons';
import PvpStats from './components/PvpStats';
import Title from 'react-title-component';
import PvpGame from './components/PvpGame';

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

  componentWillMount () {
    const { alias } = this.props.routeParams;

    this.props.dispatch(fetchUser(alias));
    this.props.dispatch(selectUser(alias));
  }

  render () {
    const { user, routeParams: { alias } } = this.props;

    const pvpGames = (user &&
      user.pvpGames &&
      user.pvpGames.length &&
      user.pvpGames) || [undefined, undefined];

    const pvpStats = user && user.pvpStats;

    return (
      <div className={styles.root}>
        <Title render={(title) => `${alias}${title}`} />

        <div className={styles.inner}>
          <ContentCard className={styles.card} content={user} size="big" type="users" />
        </div>

        <ContentCardList
          type="grid"
          alias={alias}
          items={user && user.characters}
        />

        <PvpStats stats={pvpStats} />

        <div className={styles.gamesContainer}>
          <h3>Recent matches</h3>
          {pvpGames.map((game, index) => <PvpGame game={game} key={index} />)}
        </div>

        <SocialButtons />
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  pvpSeasons: PropTypes.object,
};

export default connect(selector)(User);

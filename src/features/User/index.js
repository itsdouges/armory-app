import styles from './styles.less';
import CharactersList from 'common/components/CharactersList';
import ContentCard from 'common/components/ContentCard';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './users.reducer';
import SocialButtons from 'common/components/SocialButtons';
import PvpStats from './components/PvpStats';
// import PvpSeason from './components/PvpSeason';
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

  static contextTypes = {
    userAlias: PropTypes.string,
  };

  componentWillMount () {
    const { alias } = this.props.routeParams;

    this.props.dispatch(fetchUser(alias));
    this.props.dispatch(selectUser(alias));
  }

  render () {
    const { user, routeParams: { alias }/* , pvpSeasons*/ } = this.props;
    // const pvpStandings = (user && user.pvpStandings);

    const pvpGames = (user && user.pvpGames) || [undefined, undefined];

    return (
      <div className={styles.root}>
        <div className={styles.inner}>
          <ContentCard content={user} size="big" type="users" />
        </div>

        <CharactersList
          type="grid"
          alias={alias}
          items={user && user.characters}
        />

        <PvpStats stats={user && user.pvpStats} />

        {/* pvpStandings.map((standing, index) =>
          <PvpSeason
            key={index}
            standing={standing}
            seasons={pvpSeasons[standing.season_id]}
          />) */}

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

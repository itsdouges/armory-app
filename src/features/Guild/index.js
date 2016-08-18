import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.less';
import CharactersList from 'common/components/CharactersList';
import ContentCard from 'common/components/ContentCard';
import SocialButtons from 'common/components/SocialButtons';

import {
  selectGuild,
  fetchGuild,
} from './actions';
import { selector } from './guilds.reducer';

class Guild extends Component {
  static propTypes = {
    guild: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
  };

  componentWillMount () {
    const { guildName } = this.props.routeParams;

    this.props.dispatch(selectGuild(guildName));
    this.props.dispatch(fetchGuild(guildName));
  }

  render () {
    const { guild } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.inner}>
          <ContentCard content={guild} size="big" type="guilds" />
        </div>

        <CharactersList
          type="grid"
          items={guild && guild.characters}
        />

        <SocialButtons />
      </div>
    );
  }
}

Guild.propTypes = {
  guild: PropTypes.object,
};

export default connect(selector)(Guild);

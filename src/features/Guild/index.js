import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import ContentCard from 'common/components/ContentCard';
import SocialButtons from 'common/components/SocialButtons';
import Title from 'react-title-component';

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
    const { guild, routeParams: { guildName } } = this.props;

    return (
      <div className={styles.root}>
        <Title render={(title) => `${guildName}${title}`} />

        <div className={styles.inner}>
          <ContentCard className={styles.card} content={guild} size="big" type="guilds" />
        </div>

        <ContentCardList
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

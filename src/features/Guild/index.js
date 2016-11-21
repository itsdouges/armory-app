import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Head from 'common/components/Head';

import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';
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
    const { guild = { tag: '...' }, routeParams: { guildName } } = this.props;

    return (
      <Content content={guild} type="guilds">
        <Head title={`${guildName} [${guild.tag}]`} />

        <ContentCardList
          noBorder
          type="grid"
          items={guild && guild.characters}
        />

        <SocialButtons />
      </Content>
    );
  }
}

Guild.propTypes = {
  guild: PropTypes.object,
};

export default connect(selector)(Guild);

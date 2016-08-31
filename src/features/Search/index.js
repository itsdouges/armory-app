import { Component, PropTypes } from 'react';
import { get } from 'axios';
import { Link } from 'react-router';

import config from 'env';
import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import SocialButtons from 'common/components/SocialButtons';
import Title from 'react-title-component';
import Message from 'common/components/Message';
import ProgressIcon from 'common/components/Icon/Progress';

export default class Search extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
  };

  state = {
    results: [],
    searching: true,
  };

  componentWillMount () {
    const { term } = this.props.routeParams;
    this.search(term);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.routeParams.term !== nextProps.routeParams.term) {
      this.search(nextProps.routeParams.term);
    }
  }

  search (term) {
    this.setState({
      searching: true,
      results: [],
    });

    return get(`${config.api.endpoint}search?filter=${term}`)
      .then(({ data }) => {
        this.setState({
          searching: false,
          results: data,
        });
      });
  }

  render () {
    const resources = {
      users: [],
      characters: [],
      guilds: [],
    };

    const { results, searching } = this.state;
    const { term } = this.props.routeParams;

    results.forEach((result) => {
      resources[result.resource].push(result);
    });

    const characters = !!resources.characters.length && (
      <span>
        <h2>Characters</h2>
        <ContentCardList
          noBorder
          resource="characters"
          items={resources.characters}
          type="grid"
        />
      </span>
    );

    const users = !!resources.users.length && (
      <span>
        <h2>Users</h2>
        <ContentCardList
          noBorder
          resource="users"
          items={resources.users}
          type="grid"
        />
      </span>
    );

    const guilds = !!resources.guilds.length && (
      <span>
        <h2>Guilds</h2>
        <ContentCardList
          noBorder
          resource="guilds"
          items={resources.guilds}
          type="grid"
        />
      </span>
    );

    const noResults = !searching && !results.length && (
      <Message>
        Couldn't find anything :-(..<br /><br />
        Can't find your characters? Guild Wars Armory 2 is opt-in.<br /><br />
        You'll have to <Link to="/join">join and add your gw2 api token(s) first!</Link>
      </Message>
    );

    return (
      <div className={styles.root}>
        <Title render={(title) => `${term}${title}`} />

        <Message size="big" className={styles.message}>
          Search results for <strong><i>{term}</i></strong>...
        </Message>

        {searching && <div className={styles.iconContainer}><ProgressIcon /></div>}

        {noResults}
        {users}
        {guilds}
        {characters}
        <SocialButtons />
      </div>
    );
  }
}

import { Component, PropTypes } from 'react';
import { get } from 'axios';
import { Link } from 'react-router';
import Head from 'common/components/Head';

import config from 'config';
import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import SocialButtons from 'common/components/SocialButtons';
import Message from 'common/components/Message';
import ProgressIcon from 'common/components/Icon/Progress';

const SEARCH_TERM_MINIMUM = 3;

export default class Search extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
  };

  state = {
    results: [],
    searching: false,
    error: '',
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
    if (term.length < SEARCH_TERM_MINIMUM) {
      this.setState({
        results: [],
        error: `Search term should be ${SEARCH_TERM_MINIMUM} or more characters :-)`,
      });

      return undefined;
    }

    this.setState({
      searching: true,
      results: [],
      error: '',
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

    const { results, searching, error } = this.state;
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

    const noResults = !error && !searching && !results.length && (
      <Message>
        Nothing was found... Thought you'd find something? <br /><br />
        <Link to="/join">Join and add your gw2 api token(s) first!</Link>
      </Message>
    );

    return (
      <div className={styles.root}>
        <Head title="Search" />

        <Message size="big" className={styles.message}>
          <span>Search results for <strong><i>{term}</i></strong>...</span>
          {error && <div><br />{error}</div>}
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

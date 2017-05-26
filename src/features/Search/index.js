// @flow

import { Component } from 'react';
import { get } from 'axios';
import { Link } from 'react-router-dom';
import Head from 'common/components/Head';
import T from 'i18n-react';

import config from 'config';
import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import Message from 'common/components/Message';
import ProgressIcon from 'common/components/Icon/Progress';

const SEARCH_TERM_MINIMUM = 3;

type Props = {
  match: {
    params: {
      term: string,
    },
  },
};

export default class Search extends Component {
  props: Props;

  state = {
    results: [],
    searching: false,
    error: '',
  };

  componentWillMount () {
    const { term } = this.props.match.params;
    this.search(term);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.match.params.term !== nextProps.match.params.term) {
      this.search(nextProps.match.params.term);
    }
  }

  search (term: string) {
    if (term.length < SEARCH_TERM_MINIMUM) {
      this.setState({
        results: [],
        error: `${T.translate('search.minlength')}`,
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
    const { term } = this.props.match.params;

    results.forEach((result) => {
      resources[result.resource].push(result);
    });

    const characters = !!resources.characters.length && (
      <span>
        <h2>{T.translate('characters.name')}</h2>
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
        <h2>{T.translate('users.name')}</h2>
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
        <h2>{T.translate('guilds.name')}</h2>
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
        <T.span text={{ key: 'search.nonefound' }} /><br /><br />
        <Link to="/join"><T.span text={{ key: 'search.joincta' }} /></Link>
      </Message>
    );

    return (
      <div className={styles.root}>
        <Head title={T.translate('search.name')} />

        <Message size="big" className={styles.message}>
          <span><T.span text={{ key: 'search.results' }} /> <strong><i>{term}</i></strong>...</span>
          {error && <div><br />{error}</div>}
        </Message>

        {searching && <div className={styles.iconContainer}><ProgressIcon /></div>}

        {noResults}
        {users}
        {guilds}
        {characters}
      </div>
    );
  }
}

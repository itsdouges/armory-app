import { Component, PropTypes } from 'react';
import { get } from 'axios';
import config from 'env';
import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import SocialButtons from 'common/components/SocialButtons';
import Title from 'react-title-component';
import Message from 'common/components/Message';

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

    const characters = (
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

    const users = (
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

    const guilds = (
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

    const resultsFound = (!!resources.characters.length ||
      !!resources.users.length ||
      !!resources.guilds.length);

    return (
      <div className={styles.root}>
        <Title render={(title) => `${term}${title}`} />

        {!searching && !resultsFound && (
          <Message size="big">Nothing found with "<i>{term}</i>"...</Message>
        )}

        {(searching || !!resources.characters.length) && characters}
        {(searching || !!resources.users.length) && users}
        {(searching || !!resources.guilds.length) && guilds}
        <SocialButtons />
      </div>
    );
  }
}

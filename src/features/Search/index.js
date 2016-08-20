import { Component, PropTypes } from 'react';
import { get } from 'axios';
import config from 'env';
import styles from './styles.less';
import ContentCardList from 'common/components/ContentCardList';
import SocialButtons from 'common/components/SocialButtons';

export default class Search extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
  };

  state = {
    results: [],
    searching: true,
  };

  componentWillMount () {
    this.search();
  }

  componentDidUpdate (prevProps) {
    if (this.props.routeParams.term !== prevProps.routeParams.term) {
      this.search();
    }
  }

  search () {
    const { term } = this.props.routeParams;

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

    this.state.results.forEach((result) => {
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

    return (
      <div className={styles.root}>
        {characters}
        {users}
        {guilds}
        <SocialButtons />
      </div>
    );
  }
}

import { Component, PropTypes } from 'react';
import { get } from 'axios';
import config from 'env';
import styles from './styles.less';
import ContentCardList from 'common/components/CharactersList';

export default class Search extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
  };

  state = {
    results: [],
    searching: false,
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
      ...this.state,
      searching: true,
    });

    return get(`${config.api.endpoint}search?filter=${term}`)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          searching: false,
          results: data,
        });
      });
  }

  render () {
    let content;

    if (this.state.searching) {
      content = <div>Searching...</div>;
    } else if (!this.state.results.length) {
      content = <div>No results...</div>;
    } else {
      const resources = {
        users: [],
        characters: [],
        guilds: [],
      };

      this.state.results.forEach((result) => {
        resources[result.resource].push(result);
      });

      content = (
        <div>
          <h2>Characters</h2>
          <ContentCardList
            bottomBorder
            resource="characters"
            items={resources.characters}
            type="grid"
          />

          <h2>Users</h2>
          <ContentCardList
            bottomBorder
            resource="users"
            items={resources.users}
            type="grid"
          />

          <h2>Guilds</h2>
          <ContentCardList
            bottomBorder
            resource="guilds"
            items={resources.guilds}
            type="grid"
          />
        </div>
      );
    }

    return (
      <div className={styles.root}>
        {content}
      </div>
    );
  }
}

import { Component, PropTypes } from 'react';
import { get } from 'axios';
import config from 'env';
import ContentCard from 'common/components/ContentCard';

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
    if (this.state.searching) {
      return <div>Searching...</div>;
    }

    const content = this.state.results.length ?
      this.state.results.map((result) =>
        <ContentCard
          type={result.resource}
          key={`${result.name}${result.alias}`}
          content={result}
        />) :
      <div>No results...</div>;

    return (
      <div>
        {content}
      </div>
    );
  }
}

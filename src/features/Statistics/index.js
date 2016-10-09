import { PropTypes, Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchStatistics } from './actions';

export const selector = createSelector(
  store => store.stats,
  (stats) => ({
    stats,
  })
);

class Statistics extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    stats: PropTypes.object,
  };

  componentWillMount () {
    this.props.dispatch(fetchStatistics());
  }

  render () {
    const { stats } = this.props;

    console.log(stats);

    return (
      <div>stats</div>
    );
  }
}

export default connect(selector)(Statistics);

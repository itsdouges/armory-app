import { PropTypes, Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';

import styles from './styles.less';
import { fetchStatistics } from './actions';

import Container from 'common/components/Container';

export const selector = createSelector(
  store => store.stats,
  (armoryStats) => ({
    armoryStats,
  })
);

function mapToData (data) {
  return Object.keys(data).map((item) => {
    const count = data[item];

    return {
      name: item,
      value: count,
    };
  });
}

function mapStats (stats) {
  return Object.keys(stats).map((stat) => {
    const data = stats[stat];

    if (typeof data === 'object') {
      return mapToData(data);
    }

    return [{
      name: stat,
      value: data,
    }];
  });
}

class Statistics extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    armoryStats: PropTypes.object,
  };

  componentWillMount () {
    this.props.dispatch(fetchStatistics());
  }

  render () {
    const { armoryStats = {} } = this.props;


    const parsedStats = Object.keys(armoryStats).sort().map((name) => {
      const data = armoryStats[name];

      return {
        name,
        stats: mapStats(data),
      };
    });

    return (
      <Container className={styles.root}>
        {parsedStats.map(({ name, stats }) => (
          <span key={name}>
            <h2>{name}</h2>
            <div className={styles.chartsContainer}>
              {stats.map((data, index) => (
                <PieChart key={index} className={styles.chart} width={250} height={250}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                  />
                </PieChart>
              ))}
            </div>

            <hr />
          </span>
        ))}

        <p>Armory statistics are refreshed every thirty minutes.</p>

      </Container>
    );
  }
}

export default connect(selector)(Statistics);

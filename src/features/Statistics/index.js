import { PropTypes, Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Cell from 'recharts/lib/component/Cell';

import styles from './styles.less';
import { fetchStatistics } from './actions';

import Head from 'common/components/Head';
import Container from 'common/components/Container';

export const selector = createSelector(
  store => store.stats,
  (armoryStats) => ({
    armoryStats,
  })
);

const nameToColour = {
  Male: '#448AFF',
  Female: '#E91E63',
  Guardian: '#72C1D9',
  Revenant: '#D16E5A',
  Warrior: '#FFD166',
  Engineer: ' #D09C59',
  Ranger: '#8CDC82',
  Thief: '#C08F95',
  Elementalist: '#F68A87',
  Mesmer: '#B679D5',
  Necromancer: '#52A76F',
  Asura: '#9966FF',
  Charr: '#D25D6B',
  Human: '#FFCC33',
  Norn: '#66CCFF',
  Sylvari: '#33CC33',
  yes: '#E91E63',
  no: '#448AFF',
  count: '#009688',
};

function mapRawStatsToData (data) {
  return Object.keys(data).map((item) => {
    const count = data[item];

    return {
      name: item,
      value: count,
    };
  });
}

function mapRawStats (stats) {
  return Object.keys(stats).map((stat) => {
    const data = stats[stat];

    return {
      name: stat,
      data: typeof data === 'object' ? mapRawStatsToData(data) : data,
    };
  });
}

const RADIAN = Math.PI / 180;
// eslint-disable-next-line
const label = (data) => ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${data[index].name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

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
        stats: mapRawStats(data),
      };
    });

    return (
      <Container className={styles.root}>
        <Head title="Statistics" />

        {parsedStats.splice(0, 1).map(({ name, stats }) => (
          <span key={name}>
            <h2>{name}</h2>

            <hr />

            <div className={styles.chartsContainer}>
              {stats.filter((statData) => statData.name !== 'count').map((statData, index) => (
                <span key={index} className={styles.chartContainer}>
                  <h3>{statData.name}</h3>

                  <PieChart className={styles.chart} width={325} height={250}>
                    <Pie
                      label={label(statData.data)}
                      labelLine={false}
                      data={statData.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#82ca9d"
                      paddingAngle={3}
                    >
                    {statData.data.map((entry, indx) =>
                      <Cell key={`cell-${indx}`} fill={nameToColour[entry.name]} />)}
                    </Pie>
                  </PieChart>
                </span>
              ))}
            </div>

            <hr />
          </span>
        ))}

        <p><small>* Armory statistics are refreshed every thirty minutes.</small></p>

      </Container>
    );
  }
}

export default connect(selector)(Statistics);

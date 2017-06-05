// @flow

import { Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import T from 'i18n-react';
import upperFirst from 'lodash/upperFirst';

import styles from './styles.less';
import { fetchStatistics } from './actions';

import PieChart from 'common/components/PieChart';
import Head from 'common/components/Head';
import Container from 'common/components/Container';
import DisplayAd from 'common/components/DisplayAd';

export const selector = createSelector(
  (store) => store.stats,
  (armoryStats) => ({
    armoryStats,
  })
);

const nameToColour = {
  Male: 'blue',
  Female: 'pink',
  Guardian: 'teal',
  Revenant: 'red',
  Warrior: 'yellow',
  Engineer: 'orange',
  Ranger: 'lightgreen',
  Thief: 'brown',
  Elementalist: 'pink',
  Mesmer: 'purple',
  Necromancer: 'green',
  Asura: 'purple',
  Charr: 'red',
  Human: 'yellow',
  Norn: 'teal',
  Sylvari: 'lightgreen',
  yes: 'lightgreen',
  no: 'red',
  '1 to 39': 'green',
  '40 to 79': 'lightgreen',
  // $FlowFixMe
  80: 'teal',
};

function mapRawStatsToData (data) {
  return Object.keys(data).map((name) => {
    const count = data[name];

    return {
      name,
      value: count,
      color: nameToColour[name],
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

type Props = {
  fetchStatistics: () => Promise<>,
  armoryStats: {
    characters: Object,
  },
};

export default connect(selector, {
  fetchStatistics,
})(
class Statistics extends Component {
  props: Props;

  componentWillMount () {
    this.props.fetchStatistics();
  }

  render () {
    const { armoryStats = {
      characters: { race: { Asura: { value: 100, name: 'ok' } } },
    } } = this.props;

    const parsedStats = Object.keys(armoryStats).sort().map((name) => {
      const data = armoryStats[name];

      return {
        name,
        stats: mapRawStats(data),
      };
    });

    return (
      <Container className={styles.root}>
        <Head title={T.translate('stats.name')} />
        <DisplayAd type="leaderboard" className={styles.ad} />

        {parsedStats.slice(0, 1).map(({ name, stats }) => (
          <span key={name}>
            <h2>{upperFirst(name)}</h2>

            <hr />

            <div className={styles.chartsContainer}>
              {stats.filter((statData) => statData.name !== 'count').map((statData) => (
                <span key={statData.name} className={styles.chartContainer}>
                  <h3>{upperFirst(statData.name)}</h3>

                  <PieChart className={styles.chart} dataValues={statData.data} />
                </span>
              ))}
            </div>

            <hr />
          </span>
        ))}

        <p className={styles.note}><small>* {T.translate('stats.refreshNote')}</small></p>

        <DisplayAd type="leaderboard" className={styles.ad} />
      </Container>
    );
  }
}
);

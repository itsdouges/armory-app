// @flow

import React from 'react';
import Head from 'common/components/Head';
import Container from 'common/components/Container';

import styles from './styles.less';
import AsyncComponent from 'common/components/Async';
import Introduction from './components/Introduction';
import RandomGuilds from './components/RandomGuilds';
import ResponsiveLeaderboard from 'common/components/DisplayAd/ResponsiveLeaderboard';

const Home = () => (
  <div className={styles.root}>
    <Head title="Path of Fire" />

    <div className={styles.introBackground}>
      <Container className={styles.atfContainer}>
        <Introduction className={styles.introContainer} />

        <AsyncComponent type="ofTheDay" load={() => import('./components/RandomCharacter')} />
      </Container>
    </div>

    <Container>
      <RandomGuilds />
    </Container>

    <ResponsiveLeaderboard className={styles.ad} />
  </div>
);

export default Home;

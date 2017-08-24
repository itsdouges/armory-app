// @flow

import T from 'i18n-react';
import React from 'react';

import Head from 'common/components/Head';
import Container from 'common/components/Container';
import RandomCharacter from 'features/Home/components/RandomCharacter';

import styles from './styles.less';

const NotFound = () => (
  <Container className={styles.root}>
    <Head title="Uh Oh!" />
    <h2>{T.translate('messages.notFound')}</h2>
    <p>{T.translate('messages.resourceNotFound')}</p>
    <RandomCharacter type="random" />
    <br />
    <br />
  </Container>
);

export default NotFound;

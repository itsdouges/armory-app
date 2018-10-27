// @flow

import T from 'i18n-react';

import React from 'react';
import Container from 'common/components/Container';
import Redacted from 'common/components/Redacted';
import SummaryProgress from 'common/layouts/SummaryProgress';
import CardWithTitle from 'common/layouts/CardWithTitle';
import Grid from 'common/layouts/Grid';

import styles from './styles.less';

import type { Guild } from 'flowTypes';
import { defaultGuild } from 'flowTypes';

type Props = {
  data?: Guild,
};

const motdPlaceholder = "Today we're going to go for an adventure...";

function parseNewLines(string = '') {
  return string
    ? string.split('\n').map((tx, index) => (
        <span key={tx || index}>
          {tx}
          <br />
        </span>
      ))
    : motdPlaceholder;
}

const Overview = ({ data = defaultGuild }: Props) => (
  <Container>
    <CardWithTitle size="large" title={T.translate('guilds.motd')} className={styles.motd}>
      <Redacted redact={!data.motd}>{parseNewLines(data.motd)}</Redacted>
    </CardWithTitle>

    <Grid>
      <SummaryProgress title="Level" max={69} current={data.level || 0} />
      <SummaryProgress title="Favor" max={6000} current={data.favor || 0} />
      <SummaryProgress title="Aetherium" max={25000} current={data.aetherium || 0} />
      <SummaryProgress title="Resonance" subTitle={data.resonance || 0} />
      <SummaryProgress title="Influence" subTitle={data.influence || 0} />
    </Grid>
  </Container>
);

export default Overview;

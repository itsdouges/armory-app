// @flow

import Container from 'common/components/Container';
import Redacted from 'common/components/Redacted';
import SummaryProgress from 'common/layouts/SummaryProgress';
import Card from 'common/layouts/CardWithTitle';
import styles from './styles.less';

type Props = {
  data: {
    motd?: string,
    aetherium?: number,
    influence?: number,
    resonance?: number,
    favor?: number,
    level?: number,
  },
};

const motdPlaceholder = 'Some cool text';

function parseNewLines (string = '') {
  return string
    ? string.split('\n').map((tx, index) => <span key={index}>{tx}<br /></span>)
    : motdPlaceholder;
}

const Overview = ({ data = {} }: Props) => (
  <Container>
    <Card size="large" title="Message of the day" className={styles.motd}>
      <Redacted redact={!data.motd}>{parseNewLines(data.motd)}</Redacted>
    </Card>

    <div className={styles.summaryContainer}>
      <SummaryProgress title="Level" max={69} current={data.level} />
      <SummaryProgress title="Favor" max={6000} current={data.favor} />
      <SummaryProgress title="Aetherium" max={25000} current={data.aetherium} />
      <SummaryProgress title="Resonance" subTitle={data.resonance} />
      <SummaryProgress title="Influence" subTitle={data.influence} />
    </div>
  </Container>
);

export default Overview;

// @flow

import Container from 'common/components/Container';
import SummaryProgress from 'common/layouts/SummaryProgress';

type Props = {
  data: {
    motd: string,
    aetherium: number,
    influence: number,
    resonance: number,
    favor: number,
    level: number,
  },
};

const Overview = ({ data = {} }: Props) => (
  <Container>
    {data.motd}
    <SummaryProgress title="Level" max={69} current={data.level} />
    <SummaryProgress title="Favor" max={6000} current={data.favor} />
    <SummaryProgress title="Aetherium" max={25000} current={data.aetherium} />
  </Container>
);

export default Overview;

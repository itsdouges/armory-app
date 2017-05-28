// @flow

import get from 'lodash/get';
import startCase from 'lodash/startCase';

import Summary from 'common/layouts/Summary';
import Redacted from 'common/components/Redacted';

type Props = {
  id: number,
  worlds: Object,
};

const World = ({ id, worlds }: Props) => {
  const world = worlds[id];
  const name = get(world, 'name', '????');
  const population = startCase(get(world, 'population', '????'));
  const redacted = !world;

  return (
    <Summary
      leftIcon={{ name: 'raid.png', size: 'xlarge' }}
      title={<Redacted redact={redacted}>{name}</Redacted>}
      subTitle={<Redacted redact={redacted}>{population}</Redacted>}
    />
  );
};

World.defaultProps = {
  worlds: {},
};

export default World;

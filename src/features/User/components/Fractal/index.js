import { PropTypes } from 'react';

import Summary from 'common/layouts/Summary';
import ProgressBar from 'common/components/ProgressBar';
import Redacted from 'common/components/Redacted';

const Fractal = ({ level }) => {
  const redact = !level;

  return (
    <Summary
      leftIcon={{ name: 'raid.png', size: 'xlarge' }}
      title={<Redacted redact={redact}>Fractal Level</Redacted>}
      subTitle={
        <ProgressBar
          current={level || 0}
          max={100}
          backgroundColor="rgb(41, 41, 41)"
          barColor="rgb(85, 35, 164)"
        />
      }
    />
  );
};

Fractal.propTypes = {
  level: PropTypes.number,
};

export default Fractal;

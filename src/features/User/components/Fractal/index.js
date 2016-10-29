import { PropTypes } from 'react';

import Summary from 'common/layouts/Summary';
import Icon from 'common/components/Icon';
import ProgressBar from 'common/components/ProgressBar';

const Fractal = ({ level }) => (
  <Summary
    leftIcon={<Icon name="raid.png" size="xlarge" />}
    title="Fractal Level"
    subTitle={
      <ProgressBar
        current={level}
        max={100}
        backgroundColor="rgb(41, 41, 41)"
        barColor="rgb(85, 35, 164)"
      />
    }
  />
);

Fractal.propTypes = {
  level: PropTypes.number,
};

export default Fractal;

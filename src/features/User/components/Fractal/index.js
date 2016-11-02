import { PropTypes } from 'react';

import Summary from 'common/layouts/Summary';
import Icon from 'common/components/Icon';
import ProgressBar from 'common/components/ProgressBar';
import T from 'i18n-react';

const Fractal = ({ level }) => (
  <Summary
    leftIcon={<Icon name="raid.png" size="xlarge" />}
    title={T.translate('accSummary.fractalLvl')}
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

Fractal.propTypes = {
  level: PropTypes.number,
};

export default Fractal;

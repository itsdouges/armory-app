import { PropTypes } from 'react';

import Summary from 'common/layouts/Summary';
import ProgressBar from 'common/components/ProgressBar';
import Icon from 'common/components/Icon';

const DailyAp = ({ dailyAp, monthlyAp }) => (
  <Summary
    leftIcon={<Icon name="daily.png" size="xlarge" />}
    title="Daily Ap"
    subTitle={
      <ProgressBar
        current={(dailyAp + monthlyAp) || 0}
        max={15000}
        backgroundColor="rgb(41, 41, 41)"
        barColor="rgb(85, 35, 164)"
      />
    }
  />
);

DailyAp.propTypes = {
  dailyAp: PropTypes.number,
  monthlyAp: PropTypes.number,
};

export default DailyAp;

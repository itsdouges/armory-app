import { PropTypes } from 'react';

import Summary from 'common/layouts/Summary';
import ProgressBar from 'common/components/ProgressBar';
import Redacted from 'common/components/Redacted';

const DailyAp = ({ dailyAp, monthlyAp }) => {
  const count = (dailyAp + monthlyAp) || 0;

  return (
    <Summary
      leftIcon={{ name: 'daily.png', size: 'xlarge' }}
      title={<Redacted redact={!count}>Daily Ap</Redacted>}
      subTitle={
        <ProgressBar
          current={count}
          max={15000}
          backgroundColor="rgb(41, 41, 41)"
          barColor="rgb(85, 35, 164)"
        />
      }
    />
  );
};

DailyAp.propTypes = {
  dailyAp: PropTypes.number,
  monthlyAp: PropTypes.number,
};

export default DailyAp;

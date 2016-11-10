import { PropTypes } from 'react';

import Summary from 'common/layouts/Summary';
import ProgressBar from 'common/components/ProgressBar';
import T from 'i18n-react';
import Redacted from 'common/components/Redacted';

const DailyAp = ({ dailyAp, monthlyAp }) => {
  const count = (dailyAp + monthlyAp) || 0;

  return (
    <Summary
      leftIcon={{ name: 'daily.png', size: 'xlarge' }}
      title={<Redacted redact={!count}>{T.translate('accSummary.dailyAp')}</Redacted>}
      subTitle={
        <ProgressBar
          current={count}
          max={15000}
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

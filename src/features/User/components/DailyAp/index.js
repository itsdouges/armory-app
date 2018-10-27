// @flow

import React from 'react';
import Summary from 'common/layouts/Summary';
import ProgressBar from 'common/components/ProgressBar';
import T from 'i18n-react';
import Redacted from 'common/components/Redacted';

type Props = {
  dailyAp?: number,
  monthlyAp?: number,
};

const DailyAp = ({ dailyAp, monthlyAp }: Props) => {
  const count = dailyAp + monthlyAp || 0;

  return (
    <Summary
      leftIcon={{ name: 'daily.png', size: 'xlarge' }}
      title={<Redacted redact={!count}>{T.translate('accSummary.dailyAp')}</Redacted>}
      subTitle={<ProgressBar current={count} max={15000} />}
    />
  );
};

export default DailyAp;

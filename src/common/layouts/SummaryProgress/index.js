// @flow

import type { Children } from 'react';

import ProgressBar from 'common/components/ProgressBar';
import Summary from 'common/layouts/Summary';
import Redacted from 'common/components/Redacted';

type Props = {
  current?: number,
  max?: number,
  title: Children,
  iconName?: string,
  subTitle?: Children,
};

const SummaryProgress = ({ current, max, title, subTitle, iconName, ...props }: Props) => (
  <Summary
    {...props}
    title={<Redacted redact={!current && !subTitle}>{title}</Redacted>}
    leftIcon={{ name: iconName || 'raid.png', size: 'xlarge' }}
    subTitle={
      subTitle !== undefined
        ? subTitle
        : (
          <ProgressBar
            current={current || 0}
            max={max || 0}
          />
        )
    }
  />
);

export default SummaryProgress;

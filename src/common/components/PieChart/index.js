// @flow

import cx from 'classnames';

import styles from './styles.less';
import PieSegment from './PieSegment';
import Label from './Label';

import type { SegmentTypes } from './PieSegment';

type PieChartProps = {
  dataValues: Array<SegmentTypes>,
  size?: number,
  className?: string,
};

const PieChart = ({ dataValues, className, size = 256 }: PieChartProps) => {
  const radius = size / 2;
  const max = dataValues.reduce((total, { value }) => (total + value), 0);
  const segments = [];

  dataValues.reduce((rotationOffset, data) => {
    const centralAngle = 360 / (max / data.value);

    segments.push(
      <li key={data.name}>
        <Label
          radius={radius}
          label={data.name}
          centralAngle={centralAngle}
          rotationOffset={rotationOffset}
        />

        <PieSegment
          data={data}
          centralAngle={centralAngle}
          rotationOffset={rotationOffset}
        />
      </li>
    );

    return rotationOffset + centralAngle;
  }, 0);

  return (
    <ul className={cx(styles.root, className)} style={{ width: size, height: size }}>
      {segments}
    </ul>
  );
};

export default PieChart;

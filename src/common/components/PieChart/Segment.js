// @flow

import styles from './styles.less';
import { prefix } from 'lib/css';

const colorHueDegrees = {
  green: 0,
  lightgreen: 40,
  teal: 80,
  blue: 125,
  purple: 175,
  pink: 230,
  red: 260,
  brown: 280,
  orange: 300,
  yellow: 325,
};

type SegmentProps = {
  color: string,
  rotationOffset: number,
  centralAngle: number,
};

const MAX_SEGMENT_DEG = 90;
const Segment = ({ color, rotationOffset, centralAngle }: SegmentProps) => {
  const skew = MAX_SEGMENT_DEG - centralAngle;

  return (
    <div
      className={styles.segment}
      style={prefix('transform', `rotate(${rotationOffset}deg) skewY(${skew * -1}deg)`)}
    >
      <div
        className={styles.segmentContent}
        style={prefix('transform', `skewY(${skew}deg) rotate(-${rotationOffset}deg)`)}
      >
        <div
          className={styles.segmentBg}
          style={prefix('filter', `hue-rotate(${colorHueDegrees[color]}deg)`)}
        />
      </div>
    </div>
  );
};

export default Segment;

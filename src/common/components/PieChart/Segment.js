import { PropTypes } from 'react';

import styles from './styles.less';
import Divider from './Divider';
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

const MAX_SEGMENT_DEG = 90;
const Segment = ({ color, rotationOffset, centralAngle, hideDivider }) => {
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

        {hideDivider || <Divider rotationOffset={rotationOffset} />}
      </div>
    </div>
  );
};

Segment.propTypes = {
  color: PropTypes.string,
  rotationOffset: PropTypes.number,
  centralAngle: PropTypes.number,
  hideDivider: PropTypes.bool,
};

export default Segment;

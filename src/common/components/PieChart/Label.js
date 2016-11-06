import { PropTypes } from 'react';

import styles from './styles.less';
import upperFirst from 'lodash/upperFirst';
import { prefix } from 'lib/css';

const RADIAN = Math.PI / 180;

function calculateLabelPosition ({ rotationOffset, centralAngle, radius }) {
  const cx = radius;
  const cy = radius - 20;

   // Forces calculation to start at top of the circle.
  const angle = (rotationOffset + (centralAngle / 2)) - 90;
  const x = cx + radius * Math.cos(angle * RADIAN) * 0.7;
  const y = cy + radius * Math.sin(angle * RADIAN);

  const translate = x <= cx && prefix('transform', 'translateX(-100%)');

  return {
    top: y,
    left: x,
    ...translate,
  };
}

function calculatePercent (centralAngle) {
  return Math.round(centralAngle / 360 * 100);
}

const Label = ({ label, rotationOffset, centralAngle, radius }) => (
  <div
    style={calculateLabelPosition({ radius, rotationOffset, centralAngle })}
    className={styles.label}
  >
    {upperFirst(label)}<br />
    <span>{calculatePercent(centralAngle)}%</span>
  </div>
);

Label.propTypes = {
  rotationOffset: PropTypes.number,
  centralAngle: PropTypes.number,
  label: PropTypes.string,
  radius: PropTypes.number,
};

export default Label;

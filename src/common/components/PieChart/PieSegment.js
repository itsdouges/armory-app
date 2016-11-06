import { PropTypes } from 'react';

import Segment from './Segment';
import Divider from './Divider';

const MAX_SEGMENT_DEG = 90;
const PieSegment = ({ data: { name, color }, rotationOffset, centralAngle }) => {
  if (centralAngle > MAX_SEGMENT_DEG) {
    const segmentDegrees = [];
    let remainderCentralAngle = centralAngle;

    while (remainderCentralAngle > MAX_SEGMENT_DEG) {
      segmentDegrees.push(MAX_SEGMENT_DEG);
      remainderCentralAngle -= MAX_SEGMENT_DEG;
    }

    segmentDegrees.push(remainderCentralAngle);

    let startOffset = rotationOffset;

    return (
      <div>
        {segmentDegrees.map((degree, index) => {
          const component = (
            <Segment
              hideDivider
              key={`${name}-${degree}-${index}`}
              rotationOffset={startOffset}
              centralAngle={degree}
              color={color}
            />
          );

          startOffset += degree;

          return component;
        })}

        <Divider rotationOffset={rotationOffset} />
      </div>
    );
  }

  return (
    <Segment
      rotationOffset={rotationOffset}
      centralAngle={centralAngle}
      color={color}
    />
  );
};

PieSegment.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
  }),
  rotationOffset: PropTypes.number,
  centralAngle: PropTypes.number,
};

export default PieSegment;

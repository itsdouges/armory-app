// @flow

import React from 'react';
import Segment from './Segment';
import Divider from './Divider';

export type SegmentTypes = {
  color: string,
  name: string,
  value: any,
};

type PieSegmentProps = {
  data: SegmentTypes,
  rotationOffset: number,
  centralAngle: number,
};

const MAX_SEGMENT_DEG = 90;
const PieSegment = (props: PieSegmentProps) => {
  // For some reason destructoring props here makes rotationOffset work, but
  // destructoring the args directly makes rotationOffset return undefined
  // in child props..
  const {
    data: { name, color },
    centralAngle,
    rotationOffset,
  } = props;

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
              // eslint-disable-next-line react/no-array-index-key
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
    <div>
      <Segment rotationOffset={rotationOffset} centralAngle={centralAngle} color={color} />

      <Divider rotationOffset={rotationOffset} />
    </div>
  );
};

export default PieSegment;

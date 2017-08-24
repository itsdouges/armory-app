// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import React from 'react';
import Amulets from 'embeds/components/Amulets';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: EmbedProps) => <Amulets {...props} ids={ids} />;
}

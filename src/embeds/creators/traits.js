// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import React from 'react';
import Traits from 'embeds/components/Traits';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: EmbedProps) => <Traits {...props} ids={ids} />;
}

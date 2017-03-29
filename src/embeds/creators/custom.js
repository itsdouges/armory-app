// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import CustomEmbed from 'embeds/components/Custom';
import { makeAttribute } from 'embeds/bootstrap';

const readAttributes = (element, props) => props.reduce((obj, prop) => ({
  ...obj,
  [prop]: element.getAttribute(makeAttribute(prop)) || '',
}), {});

export default function (element: HTMLElement) {
  const props = readAttributes(element, [
    'character',
    'user',
    'mode',
    'height',
    'width',
    'cells',
    'components',
  ]);

  // $FlowFixMe
  return (embedProps: EmbedProps) => <CustomEmbed {...embedProps} {...props} />;
}

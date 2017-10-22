// @flow

import React from 'react';
import ReactDOM from 'react-dom';

export const makeAttribute = (str: string) => `data-armory-${str}`;

function bootstrapEmbeds () {
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  const embedables = Array.from(document.body.querySelectorAll(`[${makeAttribute('embed')}]`));
  return embedables.forEach((element) => {
    const embedName = element.getAttribute(makeAttribute('embed'));
    if (!embedName) {
      return;
    }

    // Remove the attribute so if the embed script is added to the document again, it doesn't pick
    // already bootstrapped embeds.
    element.removeAttribute(makeAttribute('embed'));

    ReactDOM.render(
      <div>
        <strong>GW2Armory Embeds have moved. </strong>
        Please migrate to the new CDN, go to the <a href="https://github.com/madou/armory-embeds">GitHub repository</a> for more information.
        Please join our <a href="https://discord.gg/3BRbV7b">Discord server</a> for all future update information.</div>,
      element
    );
  });
}

export default function bootstrap () {
  bootstrapEmbeds();
}

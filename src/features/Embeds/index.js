// @flow

import React, { Component } from 'react';
import T from 'i18n-react';

import Card from 'common/components/Card';
import Head from 'common/components/Head';
import ResponsiveLeaderboard from 'common/components/DisplayAd/ResponsiveLeaderboard';
import DisplayAd from 'common/components/DisplayAd';

import embeds from './text';
import styles from './styles.less';

const makeHtml = (html) => ({
  __html: html,
});

function embedIframe () {
  const script = document.createElement('script');
  script.src = 'gw2aEmbeds.js';
  document && document.head && document.head.appendChild(script);
}

export default class Embeds extends Component<*> {
  componentDidMount () {
    embedIframe();
  }

  render () {
    return (
      <div className={styles.root}>
        <Head title={T.translate('embeds.name')} />
        <ResponsiveLeaderboard />

        <article className={styles.innerRoot}>
          {embeds.map(({ title, html, options }, index) => {
            const embedComponent = (
              <div key={title}>
                <h2>{title}</h2>
                <Card size="medium" className={styles.card}>
                  <div dangerouslySetInnerHTML={makeHtml(html)} />
                  <pre>{`${html}

<script async src="https://gw2armory.com/gw2aEmbeds.js"></script>`}</pre>
                </Card>
              </div>
            );

            if ((index + 1) % 3 === 0) {
              return [
                embedComponent,
                <DisplayAd type="mrec" className={styles.mrec} />,
              ];
            }

            return embedComponent;
          })}
        </article>
      </div>
    );
  }
}

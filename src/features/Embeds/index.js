// @flow

import { Component } from 'react';
import T from 'i18n-react';

import Card from 'common/components/Card';
import Head from 'common/components/Head';

import embeds from './text';
import styles from './styles.less';

const makeHtml = (html) => ({
  __html: `
${html}
<script async src="http://localhost:3001/gw2aEmbeds.js"></script>
  `,
});

function embedIframe () {
  const script = document.createElement('script');
  script.src = 'gw2aEmbeds.js';
  document && document.head && document.head.appendChild(script);
}

export default class Embeds extends Component {
  componentDidMount () {
    embedIframe();
  }

  render () {
    return (
      <div className={styles.root}>
        <Head title={T.translate('embeds.name')} />

        <h2>Options</h2>
        <Card size="medium" className={styles.card}>
          Add options in the head of your webpage.
          Ensure it is set immediately and not after the page has loaded
          (do not use inside document.onReady or equivalent).

          <p>lang</p>
          <ul>
            <li>en (ENGLISH)</li>
            <li>fr (FRENCH)</li>
            <li>de (GERMAN)</li>
            <li>es (SPANISH)</li>
            <li>zh (CHINESE)</li>
            <li>ru (RUSSIAN [limited support])</li>
          </ul>

          <pre>
            {`document.GW2A_EMBED_OPTIONS = {
  lang: 'en',
};`}
          </pre>
        </Card>

        <h2>Styling</h2>
        <Card size="medium" className={styles.card}>
          To style any embed simply target the embed with the embed name, e.g:

          <pre>{`.gw2a-character-embed
.gw2a-items-embed
.gw2a-skills-embed
.gw2a-tooltip-embed
.gw2a-amulets-embed
.gw2a-traits-embed
.gw2a-specializations-embed`}</pre>
        </Card>

        {embeds.map(({ title, html }) => (
          <div key={title}>
            <h2>{title}</h2>
            <Card size="medium" className={styles.card}>
              <div dangerouslySetInnerHTML={makeHtml(html)} />
              <pre>{`${html}
<script async src="https://gw2armory.com/gw2aEmbeds.js"></script>`}</pre>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

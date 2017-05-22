// @flow

import iframe from 'iframe';
import Card from 'common/components/Card';

import embeds from './text';
import styles from './styles.less';

function embedIframe (ref, html) {
  if (!ref) {
    return;
  }

  const body = `
    ${html}
    <script async src="/gw2aEmbeds.js"></script>
  `;

  iframe({ container: ref, body });
}

const Embeds = () => (
  <Card size="medium" className={styles.root}>
    <h2>Embed Options</h2>

    <p>
      Add options in the head of your webpage.
      ensure it is set immediately and not after the page has loaded
      (do not use inside document.onReady or equivalent).
    </p>

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

    <h2>Styling Embeds</h2>

    <p>To style any embed simply target the embed with the embed name, e.g:</p>

    <pre>{`.gw2a-character-embed
.gw2a-items-embed
.gw2a-skills-embed
.gw2a-tooltip-embed
.gw2a-specializations-embed`}</pre>

    {embeds.map(({ title, html }) => (
      <div key={title}>
        <h2>{title}</h2>
        <pre>{html}</pre>
        <div ref={(ref) => embedIframe(ref, html)} />
      </div>
    ))}
  </Card>
);

export default Embeds;

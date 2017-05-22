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
  <div className={styles.root}>
    <h2>Options</h2>
    <Card size="medium">
      Add options in the head of your webpage.
      ensure it is set immediately and not after the page has loaded
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

    <h2>Styling Embeds</h2>
    <Card size="medium">
      To style any embed simply target the embed with the embed name, e.g:

      <pre>{`.gw2a-character-embed
  .gw2a-items-embed
  .gw2a-skills-embed
  .gw2a-tooltip-embed
  .gw2a-specializations-embed`}</pre>
    </Card>

    {embeds.map(({ title, html }) => (
      <div key={title}>
        <h2>{title}</h2>
        <Card size="medium">
          <div ref={(ref) => embedIframe(ref, html)} />
          <pre>{html}</pre>
        </Card>
      </div>
    ))}
  </div>
);

export default Embeds;

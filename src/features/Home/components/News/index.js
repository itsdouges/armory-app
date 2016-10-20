import { PropTypes } from 'react';

import styles from './styles.less';
import Card from 'common/components/Card';

/* eslint max-len:0 */
const news = [{
  title: 'Character Privacy',
  date: '13/10/16',
  content: 'Venture to your character pages, click edit, and you will now see a checkbox that you can use to hide your characters. Happy hiding!',
}, {
  title: 'Embed Your Characters!',
  date: '7/10/16',
  content: 'Character embeddables are now available. Click on the embed icon for any character and copy and paste the markup onto your website.',
}, {
  title: 'Character Pvp Mode',
  date: '27/09/16',
  content: 'Characters can now be viewed in pvp mode! Attribute calculation fixes coming soon.',
}, {
  title: 'Skills, Trait Tooltips, and Games Modes',
  date: '19/09/16',
  content: 'Character pages now have skills (with tooltips) and trait tooltips available.',
}, {
  title: 'PvP Season Standings',
  date: '15/09/16',
  content: 'Current pvp seasons are now available on user pages, historical pvp seasons coming soon.',
}, {
  title: 'Forgot Your Password?',
  date: '10/09/16',
  content: 'If you\'ve forgotten your password you can now reset it, you can find it through the login screen.',
}, {
  title: 'The Front Page',
  date: '28/08/16',
  content: 'If you\'re reading this, gw2armory now has a front-page! You\'ll slowly see improvements here. Keep checking back!',
}, {
  title: 'Custom Images',
  date: '27/08/16',
  content: 'You can now change your Avatar and Character Portraits! Go to your settings and character pages respectively to modify them.',
}, {
  title: 'UI Refresh',
  date: '22/08/16',
  content: <span>The user interface has been remade, it's now faster, leaner, and easier to develop with. <a href="https://github.com/madou/armory-react"><strong>Check it out on Github</strong></a> if you're into that kind of thing ;-).</span>,
}];

const News = (props) => (
  <div className={props.className}>
    <h2>Armory News</h2>
    <div className={styles.root}>
      {news.map((item) => (
        <div className={styles.newsItem} key={item.title}>
          <Card className={styles.newsItemInner}>
            <div className={styles.newsItemHeader}>
              <h3 className={styles.newsItemTitle}>{item.title}</h3>
              <div><i>{item.date}</i></div>
            </div>

            <hr />

            <div className={styles.newsItemContent}>{item.content}</div>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

News.propTypes = {
  className: PropTypes.string,
};

export default News;

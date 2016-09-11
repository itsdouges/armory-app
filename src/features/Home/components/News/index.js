import { PropTypes } from 'react';

import styles from './styles.less';
import Card from 'common/components/Card';

/* eslint max-len:0 */
const news = [{
  title: 'Forgot Your Password?',
  date: '10/09/16',
  content: 'If you\'ve forgotten your password you can now reset it, you can find it through the login screen.',
}, {
  title: 'The Front Page',
  date: '28/08/16',
  content: 'If you\'re reading this, gw2armory now has a front-page! You\'ll slowly see improvements here. Keep checking back!',
}, {
  title: 'Custom Images!!!',
  date: '27/08/16',
  content: 'You can now change your Avatar and Character Portraits! Go to your settings and character pages respectively to modify them.',
}, {
  title: 'UI Refresh',
  date: '22/08/16',
  content: <span>The user interface has been remade, it's now faster, leaner, and easier to develop with. <a href="https://github.com/madou/armory-react"><strong>Check it out on Github</strong></a> if you're into that kind of thing ;-).</span>,
}];

const News = (props) => (
  <div className={props.className}>
    <h2>Latest News</h2>
    <div className={styles.root}>
      {news.map((item) => (
        <div className={styles.newsItem} key={item.title}>
          <Card className={styles.newsItemInner}>
            <div className={styles.newsItemHeader}>
              <h3 className={styles.newsItemTitle}>{item.title}</h3>
              <div>{item.date}</div>
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

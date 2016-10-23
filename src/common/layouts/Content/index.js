import { PropTypes } from 'react';
import ContentCard from 'common/components/ContentCard';

import styles from './styles.less';

const Content = ({ type, children, content, extraContent }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <ContentCard type={type} content={content} size="big" />
      {extraContent}
    </div>

    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.any,
  extraContent: PropTypes.any,
  content: PropTypes.object,
  type: PropTypes.oneOf(['characters', 'users', 'guilds']),
};

export default Content;

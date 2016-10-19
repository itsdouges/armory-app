import { PropTypes } from 'react';
import ContentCard from 'common/components/ContentCard';

import styles from './styles.less';

const Content = ({ type, children, content }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <ContentCard type={type} content={content} size="big" />
    </div>

    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.any,
  content: PropTypes.object,
  type: PropTypes.oneOf(['characters', 'users', 'guilds']),
};

export default Content;

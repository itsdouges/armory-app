import { PropTypes } from 'react';
import ContentCard from 'common/components/ContentCard';

import styles from './styles.less';

const Content = ({ children, extraContent, ...props }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <ContentCard {...props} size="big" />
      {extraContent}
    </div>

    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.any,
  extraContent: PropTypes.any,
};

export default Content;

// @flow

import ContentCard from 'common/components/ContentCard';

import styles from './styles.less';

type Props = {
  children?: any,
  extraContent?: any,
};

const Content = ({ children, extraContent, ...props }: Props) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <ContentCard {...props} size="big" />
      {extraContent}
    </div>

    {children}
  </div>
);

export default Content;

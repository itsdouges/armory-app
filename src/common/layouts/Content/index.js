// @flow

import ContentCard from 'common/components/ContentCard';
import Tabs from 'common/components/Tabs';
import Head from 'common/components/Head';
import SocialButtons from 'common/components/SocialButtons';

import styles from './styles.less';

type Props = {
  children?: ReactClass<>,
  extraContent?: ReactClass<>,
  tabs?: [],
  title: string,
  description?: string,
};

const Content = ({ children, extraContent, tabs, title, description, ...props }: Props) => (
  <div className={styles.root}>
    <Head title={title} description={description} />
    <SocialButtons />

    <div className={styles.heroBg}>
      <div className={styles.inner}>
        <ContentCard {...props} size="big" />
        {extraContent}
      </div>
    </div>

    {tabs && <Tabs tabs={tabs} />}

    {children}
  </div>
);

export default Content;

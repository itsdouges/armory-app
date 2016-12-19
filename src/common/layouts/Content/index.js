// @flow

import ContentCard from 'common/components/ContentCard';
import Tabs from 'common/components/Tabs';
import Head from 'common/components/Head';
import SocialButtons from 'common/components/SocialButtons';
import Tooltip from 'common/components/Tooltip';

import styles from './styles.less';

type Props = {
  children?: ReactClass<>,
  extraContent?: ReactClass<>,
  tabs?: [],
  title: string,
  description?: string,
  cardExtra?: any,
};

const Content = ({
  children,
  extraContent,
  tabs,
  title,
  description,
  cardExtra,
  ...props
}: Props) => (
  <div className={styles.root}>
    <Head title={title} description={description} />
    <SocialButtons />

    <div className={styles.heroBg}>
      <div className={styles.inner}>
        <ContentCard {...props} size="big">{cardExtra}</ContentCard>
        {extraContent}
      </div>
    </div>

    {tabs && <Tabs titleSuffix={title} tabs={tabs} />}

    {children}

    <Tooltip />
  </div>
);

export default Content;

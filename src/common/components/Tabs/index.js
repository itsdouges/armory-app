// @flow

import findIndex from 'lodash/findIndex';

import Container from 'common/components/Container';

import Head from 'common/components/Head';
import styles from './styles.less';
import Tab from './Tab';

import type { Tab$Props } from './Tab';

export type TabInput = Tab$Props & {
  content: any,
  ignoreTitle?: boolean,
  description?: string,
};

type TabsProps = {
  tabLayout?: any,
  pinnedTab?: any,
  tabs: Array<TabInput>,
  titleSuffix: string,
};

const zeroIndex = (index) => (index < 0 ? 0 : index);

const Tabs = ({ tabs, titleSuffix, tabLayout, pinnedTab }: TabsProps) => {
  const { pathname } = window.location;
  const selected = findIndex(tabs, (tab) => tab.to === pathname);
  const { content, name, ignoreTitle, description } = tabs[zeroIndex(selected)];
  const Layout = tabLayout;

  return (
    <div className={styles.root}>
      {ignoreTitle || <Head title={`${name} | ${titleSuffix}`} description={description} />}

      <div className={styles.tabsBg}>
        <Container className={styles.tabsContainer}>
          <ul>
            {tabs.map((tab, index) => (
              <li key={tab.to}>
                <Tab
                  {...tab}
                  index={index}
                  selected={index === selected}
                />
              </li>
            ))}

            {pinnedTab && (
              <li className={styles.pinnedRight}>{pinnedTab}</li>
            )}
          </ul>
        </Container>
      </div>

      {Layout ? <Layout>{content}</Layout> : content}
    </div>
  );
};

export default Tabs;

// @flow

import Container from 'common/components/Container';
import Tab from './Tab';
import styles from './styles.less';
import findIndex from 'lodash/findIndex';
import Head from 'common/components/Head';

import type { Tab$Props } from './Tab';

type TabInput = Tab$Props & {
  content: any,
  ignoreTitle?: boolean,
};

const zeroIndex = (index) => (index < 0 ? 0 : index);

const Tabs = ({ tabs, titleSuffix }: { tabs: Array<TabInput>, titleSuffix: string }) => {
  const { pathname } = window.location;
  const selected = findIndex(tabs, (tab) => tab.to === pathname);
  const { content, name, ignoreTitle } = tabs[zeroIndex(selected)];

  return (
    <div>
      {ignoreTitle || <Head title={`${name} | ${titleSuffix}`} />}

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
          </ul>
        </Container>
      </div>

      {content}
    </div>
  );
};

export default Tabs;

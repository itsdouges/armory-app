// @flow

import Container from 'common/components/Container';
import Tab from './Tab';
import styles from './styles.less';
import findIndex from 'lodash/findIndex';

type TabInput = {
  name: string,
  to?: string,
  content: any,
};

const zeroIndex = (index) => (index < 0 ? 0 : index);

const Tabs = ({ tabs }: { tabs: Array<TabInput> }) => {
  const { pathname } = window.location;
  const selected = findIndex(tabs, (tab) => tab.to === pathname);
  const { content } = tabs[zeroIndex(selected)];

  return (
    <div>
      <div className={styles.tabsBg}>
        <Container className={styles.tabsContainer}>
          <ul>
            {tabs.map((tab, index) => (
              <li key={tab.name}>
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

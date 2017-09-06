// @flow

import React from 'react';

import cx from 'classnames';
import Container from 'common/components/Container';
import styles from './styles.less';
import Tab from './Tab';

import type { Tab$Props } from './Tab';

export type TabInput = Tab$Props & {
  content: any,
  ignoreTitle?: boolean,
  description?: string,
  hide?: boolean,
};

type TabsProps = {
  pinnedTab?: any,
  tabs: Array<TabInput>,
  basePath: string,
  appearance: 'default' | 'transparent',
};

const Tabs = ({ tabs, pinnedTab, basePath, appearance }: TabsProps) => (
  <nav className={cx(styles.tabsBg, styles[appearance])}>
    <Container className={styles.tabsContainer} tag="ul">
      {tabs.map((tab) => (tab.hide ? null : (
        <li key={tab.path}>
          <Tab
            flair={tab.flair}
            exact={!tab.path}
            path={`${basePath}${tab.path}`}
            name={tab.name}
          />
        </li>
      )))}

      {pinnedTab && (
        <li className={styles.pinnedRight}>{pinnedTab}</li>
      )}
    </Container>
  </nav>
);

Tabs.defaultProps = {
  appearance: 'default',
};

export default Tabs;

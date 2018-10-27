// @flow

import type { Node } from 'react';

import React from 'react';

import styles from './styles.less';
import TabsRow from './TabsRow';
import Content from './Content';

import type { Tab$Props } from './Tab';

export type TabInput = Tab$Props & {
  content: any,
  ignoreTitle?: boolean,
  description?: string,
  hide?: boolean,
};

type TabsProps = {
  tabLayout?: any,
  pinnedTab?: any,
  tabs: Array<TabInput>,
  titleSuffix: string,
  basePath: string,
  metaContent?: Node,
};

const Tabs = ({ metaContent, ...props }: TabsProps) => (
  <div className={styles.root}>
    <TabsRow {...props} appearance="default" />

    {!!metaContent && <aside className={styles.metaContent}>{metaContent}</aside>}

    <Content {...props} />
  </div>
);

export default Tabs;

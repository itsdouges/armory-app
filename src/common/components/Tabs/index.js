// @flow

import type { Children } from 'react';

import { cloneElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import Head from 'common/components/Head';
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
  tabLayout?: any,
  pinnedTab?: any,
  tabs: Array<TabInput>,
  titleSuffix: string,
  basePath: string,
  metaContent?: Children,
};

const Tabs = ({ tabs, titleSuffix, tabLayout: Layout, pinnedTab, basePath, metaContent }: TabsProps) => (
  <div className={styles.root}>
    <nav className={styles.tabsBg}>
      <Container className={styles.tabsContainer}>
        <ul>
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
        </ul>
      </Container>
    </nav>

    {!!metaContent && (
      <aside className={styles.metaContent}>
        {metaContent}
      </aside>
    )}

    <section>
      <Switch>
        {tabs.map((tab) => (tab.hide ? null : (
          <Route
            exact={!tab.path}
            key={tab.path}
            path={`${basePath}${tab.path}`}
            render={(props) => {
              const content = cloneElement(tab.content, props);

              return (
                <span>
                  {tab.ignoreTitle || <Head title={`${tab.name} | ${titleSuffix}`} description={tab.description} />}
                  {Layout ? <Layout>{content}</Layout> : content}
                </span>
              );
            }}
          />
        )))}
      </Switch>
    </section>
  </div>
);

export default Tabs;

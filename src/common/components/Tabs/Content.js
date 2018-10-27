// @flow

import React, { cloneElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import Head from 'common/components/Head';

import type { Tab$Props } from './Tab';

export type TabInput = Tab$Props & {
  content: any,
  ignoreTitle?: boolean,
  description?: string,
  hide?: boolean,
};

type TabsProps = {
  tabLayout?: any,
  tabs: Array<TabInput>,
  titleSuffix: string,
  basePath: string,
};

const TabsContent = ({ tabs, titleSuffix, tabLayout: Layout, basePath }: TabsProps) => (
  <section>
    <Switch>
      {tabs.map(
        tab =>
          tab.hide ? null : (
            <Route
              exact={!tab.path}
              key={tab.path}
              path={`${basePath}${tab.path}`}
              render={props => {
                const content = cloneElement(tab.content, props);

                return (
                  <span>
                    {tab.ignoreTitle || (
                      <Head title={`${tab.name} | ${titleSuffix}`} description={tab.description} />
                    )}
                    {Layout ? <Layout>{content}</Layout> : content}
                  </span>
                );
              }}
            />
          )
      )}
    </Switch>
  </section>
);

export default TabsContent;

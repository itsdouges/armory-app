// @flow

import { Component } from 'react';

import Container from 'common/components/Container';
import Tab from './Tab';
import styles from './styles.less';

type TabInput = {
  name: string,
  to?: string,
  content: any,
};

export default class Tabs extends Component {
  props: {
    tabs: Array<TabInput>,
  };

  state: {
    selected: number,
  };

  state = {
    selected: 0,
  };

  tabClicked = (selected: number) => {
    this.setState({
      selected,
    });
  };

  render () {
    const { tabs } = this.props;
    const { selected } = this.state;
    const { content } = tabs[selected];

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
                    onClick={this.tabClicked}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </div>

        {content}
      </div>
    );
  }
}

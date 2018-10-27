// @flow

import React from 'react';
import styles from './styles.less';
import Card from 'common/components/Card';

type Props = {
  children?: Array<any>,
  icon?: any,
  selected?: number,
};

const SelectList = ({ children = [], icon, selected = 0 }: Props) => (
  <div className={styles.root}>
    <div className={styles.selector}>{icon || children[selected]}</div>

    <Card className={styles.listContainer}>
      <ul className={styles.list}>
        {children.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  </div>
);

export default SelectList;

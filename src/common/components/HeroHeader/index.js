// @flow

import type { Node } from 'react';

import React from 'react';
import styles from './styles.less';

type Props = {
  title: Node,
  children?: Node,
  backgroundImage: string,
};

const HeroHeader = ({ children, backgroundImage, title }: Props) => (
  <div className={styles.root}>
    <div
      className={styles.background} style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    />

    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>

    {children}
  </div>
);

export default HeroHeader;

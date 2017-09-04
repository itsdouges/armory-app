// @flow

import type { Node } from 'react';
import React from 'react';
import styles from './styles.less';

type Props = {
  children: Node,
  href?: string,
  text?: string,
}

const ResourceLink = ({ children, href, text, ...props }: Props) => (href ? (
  <span {...props} className={styles.root}>
    {children}

    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      className={styles.link}
    >
      {text || 'Loading...'}
    </a>
  </span>
) : React.cloneElement(children, props));

export default ResourceLink;

// @flow

import type { Node } from 'react';
import React from 'react';
import { get as getLang } from 'lib/i18n';
import LoadingStrip from 'common/components/LoadingStrip';

import styles from './styles.less';

type Props = {
  children: Node,
  href?: string,
  text?: string,
};

export const buildLink = (href?: string, text?: string) => {
  switch (href) {
    case 'wiki':
      return `http://wiki-${getLang()}.guildwars2.com/wiki/Special:Search/${text || ''}`;

    default:
      return href;
  }
};

const ResourceLink = ({ children, href, text, ...props }: Props) =>
  href ? (
    <span {...props} className={styles.root}>
      {children}

      <a rel="noopener noreferrer" target="_blank" href={href} className={styles.link}>
        <LoadingStrip>{text}</LoadingStrip>
      </a>
    </span>
  ) : (
    // $FlowFixMe - cloneElement doesn't take Node?
    React.cloneElement(children, props)
  );

export default ResourceLink;

// @flow

import styles from './styles.less';
import cx from 'classnames/bind';
import config from 'config';

import type { Character } from 'flowTypes';
import { defaultCharacter } from 'flowTypes';

const endpoint = config.imagesEndpoint;

type Props = {
  character?: Character,
  forceUpdate?: boolean,
  children?: any,
  className?: string,
  compact?: boolean,
};

/* eslint max-len:0 */
const Portrait = ({ character = defaultCharacter, forceUpdate, children, className, compact }: Props) => (
  <div
    className={cx(
      styles.root,
      className,
      styles.portraitBgDefault,
      character.race && styles[character.race.toLowerCase()],
      { [styles.compact]: compact },
    )}
  >
    <div className={cx(styles.portraitTopIn, styles.borderStrip1)} />
    <div
      className={cx(styles.portrait)}
      style={{
        backgroundImage: encodeURI(`url(${endpoint}${character.alias || ''}/characters/${character.name || ''}${forceUpdate ? `?${+new Date()}` : ''})`),
      }}
    />
    <div className={cx(styles.portraitBottomIn, styles.borderStrip2)} />
    {children}
  </div>
);

export default Portrait;

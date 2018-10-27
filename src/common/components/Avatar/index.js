// @flow

import React from 'react';
import cx from 'classnames';
import Icon from 'common/components/Icon';
import config from 'config';
import styles from './styles.less';

type AvatarProps = {
  alias: string,
  className?: string,
};

const Avatar = ({ alias, className }: AvatarProps) => (
  <Icon
    className={cx(styles.avatar, className)}
    src={`${config.imagesEndpoint}${alias}/avatar`}
    name={alias}
  />
);

export default Avatar;

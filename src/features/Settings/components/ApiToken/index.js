// @flow

import type { Token } from 'flowTypes';

import React from 'react';
import T from 'i18n-react';
import cx from 'classnames';

import SvgIcon from 'common/components/Icon/Svg';
import { TooltipTrigger } from 'armory-component-ui';
import styles from './styles.less';

type Props = {
  remove: Function,
  setPrimary: Function,
  token: Token,
};

const ApiToken = ({ token: { accountName, primary, permissions, valid }, remove, setPrimary }: Props) => (
  <div className={styles.root}>
    <TooltipTrigger data={T.translate(primary ? 'users.primaryToken' : 'users.makePrimary')}>
      <button onClick={setPrimary}>
        <SvgIcon button name={primary ? 'cb-checked' : 'cb-clear'} />
      </button>
    </TooltipTrigger>

    <div className={cx(styles.information, { [styles.invalid]: !valid })}>
      <span className={cx({ [styles.strikethrough]: !valid })}>
        <div className={styles.accountName}>
          {accountName}
        </div>

        <div className={styles.permissions}>
          {permissions.split(',').join(' | ')}
        </div>
      </span>

      {!valid && <sub>{T.translate('users.invalidToken')}</sub>}
    </div>

    <button onClick={remove}>
      <SvgIcon button name="delete-forever" />
    </button>
  </div>
);

export default ApiToken;

// @flow

import type { Notifications, Notification as NotificationType } from 'flowTypes';

import { connect } from 'react-redux';
import { Component } from 'react';
import cx from 'classnames';

import Container from 'common/components/Container';
import Notification from '../Notification';
import { dismissNotification } from '../../actions';
import styles from './styles.less';

function mapStoreToProps (store) {
  return {
    notifications: store.app.notifications,
  };
}

type Props = {
  className?: string,
  notifications?: Notifications,
  dismissNotification?: (string) => void,
};

@connect(mapStoreToProps, {
  dismissNotification,
})
export default class NotificationBox extends Component {
  props: Props;

  render () {
    const { notifications, dismissNotification, className } = this.props;
    if (!notifications || Object.keys(notifications).length === 0) {
      return null;
    }

    return (
      <Container className={cx(styles.root, className)}>
        <ol>
          {/* $FlowFixMe */}
          {Object.values(notifications).map((msg: NotificationType) =>
            <li key={msg.id}>
              <Notification
                className={styles.notification}
                message={msg.message}
                type={msg.type}
                dismiss={() => dismissNotification && dismissNotification(msg.id)}
              />
            </li>
          )}
        </ol>
      </Container>
    );
  }
}

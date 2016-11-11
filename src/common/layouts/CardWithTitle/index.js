// @flow

import styles from './styles.less';

import Card from 'common/components/Card';
import Message from 'common/components/Message';

type Props = {
  children?: any,
  title: any,
  message?: any,
  error?: string,
  className?: string,
  size?: 'compact' | 'standard',
  type?: 'small' | 'medium' | 'large',
};

const CardWithTitle = ({
  children,
  title,
  message,
  error,
  className,
  type,
  size = 'small',
}: Props) => (
  <span className={className}>
    <h2>{title}</h2>

    <Card size={size} className={styles[type]}>
      <Message type="info">{message}</Message>
      <Message type="error">{error}</Message>

      {children}
    </Card>
  </span>
);

export default CardWithTitle;

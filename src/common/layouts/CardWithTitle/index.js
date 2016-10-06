import { PropTypes } from 'react';

import styles from './styles.less';

import Card from 'common/components/Card';
import Message from 'common/components/Message';

const CardWithTitle = ({ children, title, message, error, className, size = 'small', type }) => (
  <span className={className}>
    <h2>{title}</h2>

    <Card size={size} className={styles[type]}>
      <Message type="info">{message}</Message>
      <Message type="error">{error}</Message>

      {children}
    </Card>
  </span>
);

CardWithTitle.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any,
  message: PropTypes.any,
  error: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['compact', 'standard']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default CardWithTitle;

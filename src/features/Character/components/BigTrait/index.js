import { PropTypes } from 'react';
import styles from './styles.less';

const BigTrait = ({ name, image }) => (
  <div
    className={styles.bigIcon}
    style={{ backgroundImage: `url(${image})` }}
  >
    <div className={styles.bigIconTop} />
    <div className={styles.bigIconBottom} />
  </div>
);

BigTrait.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

export default BigTrait;

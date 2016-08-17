import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';

const BigTrait = ({ name, image }) => (
  <TooltipTrigger data={name}>
    <div
      className={styles.bigIcon}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.bigIconTop} />
      <div className={styles.bigIconBottom} />
    </div>
  </TooltipTrigger>
);

BigTrait.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

export default BigTrait;

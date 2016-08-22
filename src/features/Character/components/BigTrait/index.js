import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import cx from 'classnames';

const BigTrait = ({ name, image, className }) => (
  <TooltipTrigger data={name}>
    <div
      className={cx(styles.bigIcon, className)}
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
  className: PropTypes.string,
};

export default BigTrait;

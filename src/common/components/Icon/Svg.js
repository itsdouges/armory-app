import Icon from './';
import { PropTypes } from 'react';

const SvgIcon = (props) => (
  <Icon {...props} name={`svg/${props.name}.svg`} />
);

SvgIcon.propTypes = {
  name: PropTypes.string,
};

export default SvgIcon;

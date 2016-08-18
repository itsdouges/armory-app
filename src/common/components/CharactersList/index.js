import { PropTypes } from 'react';
import ContentCard from 'common/components/ContentCard';
import Card from 'common/components/Card';
import { Link } from 'react-router';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const CharactersList = ({ characters = [], alias, type = 'list', bottomBorder }) => {
  const content = characters.length ?
    characters.map((character) => (
      <Link
        to={`/${alias || character.userAlias}/characters/${character.name}`}
        key={character.name}
        className={cx('item', 'withHover')}
      >
        <ContentCard content={character} />
      </Link>)
    ) :
    [0, 0].map((data, index) => (
      <ContentCard className={styles.item} key={index} />)
    );

  const borderStyle = bottomBorder ? 'borderContainerBottom' : 'borderContainerTop';

  return (
    <div className={styles.root}>
      <div className={cx('borderContainer', borderStyle)}>
        <div className={cx('border', 'borderLeft')}></div>
        <div className={cx('border', 'borderRight')}></div>
      </div>

      <Card className={cx('container', type)}>
        {content}
      </Card>
    </div>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
  alias: PropTypes.string,
  type: PropTypes.oneOf(['grid', 'list']),
  bottomBorder: PropTypes.bool,
};

export default CharactersList;

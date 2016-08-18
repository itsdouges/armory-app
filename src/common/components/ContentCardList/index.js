import { PropTypes } from 'react';
import ContentCard from 'common/components/ContentCard';
import Card from 'common/components/Card';
import { Link } from 'react-router';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function buildUrl (item, aliasOverride, resource) {
  switch (resource) {
    case 'users':
      return `/${item.name}`;

    case 'characters':
      return `/${aliasOverride || item.alias || item.userAlias}/characters/${item.name}`;

    case 'guilds':
      return `/g/${item.name}`;

    default:
      return '';
  }
}

const ContentCardList = ({
  items = [],
  alias,
  type = 'list',
  bottomBorder,
  noBorder,
  resource = 'characters',
}) => {
  const content = items.length ?
    items.map((item) => (
      <Link
        to={buildUrl(item, alias, resource)}
        key={item.name}
        className={cx('item', 'withHover')}
      >
        <ContentCard type={item.resource} content={item} />
      </Link>)
    ) :
    [0, 0].map((data, index) => (
      <ContentCard className={styles.item} key={index} />)
    );

  const borderStyle = bottomBorder ? 'borderContainerBottom' : 'borderContainerTop';

  return (
    <div className={styles.root}>
      {!noBorder && (
        <div className={cx('borderContainer', borderStyle)}>
          <div className={cx('border', 'borderLeft')}></div>
          <div className={cx('border', 'borderRight')}></div>
        </div>
      )}

      <Card className={cx('container', type)}>
        {content}
      </Card>
    </div>
  );
};

ContentCardList.propTypes = {
  items: PropTypes.array,
  alias: PropTypes.string,
  resource: PropTypes.string,
  noBorder: PropTypes.bool,
  type: PropTypes.oneOf(['grid', 'list']),
  bottomBorder: PropTypes.bool,
};

export default ContentCardList;

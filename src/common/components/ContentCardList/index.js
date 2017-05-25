// @flow

import type { ContentType } from 'common/components/ContentCard';

import ContentCard from 'common/components/ContentCard';
import Card from 'common/components/Card';
import { Link } from 'react-router-dom';
import styles from './styles.less';
import cx from 'classnames';

function buildUrl (item, aliasOverride, resource) {
  switch (resource) {
    case 'users':
      return `/${item.name}`;

    case 'characters':
      return `/${aliasOverride || item.alias || item.userAlias}/c/${item.name}`;

    case 'guilds':
      return `/g/${item.name}`;

    default:
      return '';
  }
}

type ContentCardListProps = {
  // TODO: Type properly.
  items?: any,
  alias?: string,
  noBorder?: boolean,
  resource?: ContentType,
  type?: 'grid' | 'list',
  bottomBorder?: boolean,
  children?: any,
};

const ContentCardList = ({
  items = [],
  alias,
  type = 'list',
  bottomBorder,
  noBorder,
  resource = 'characters',
  children,
}: ContentCardListProps) => {
  const content = items.length ?
    items.map((item, index) => {
      const card = <ContentCard type={resource || item.resource} content={item} />;
      const key = `${item.name}-${index}`;

      if (item.gw2Only) {
        return <div key={key} className={styles.item}>{card}</div>;
      }

      return (
        <Link
          to={buildUrl(item, alias, resource)}
          key={key}
          className={cx(styles.item, styles.withHover)}
        >
          {card}
        </Link>);
    }) :
    [0, 0].map((data, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ContentCard className={styles.item} key={index} />)
    );

  const borderStyle = bottomBorder ? 'borderContainerBottom' : 'borderContainerTop';

  return (
    <div className={styles.root}>
      {!noBorder && (
        <div className={cx(styles.borderContainer, styles[borderStyle])}>
          <div className={cx(styles.border, styles.borderLeft)} />
          <div className={cx(styles.border, styles.borderRight)} />
        </div>
      )}

      <Card className={cx(styles.container, styles[type])}>
        {content}
        {children}
      </Card>
    </div>
  );
};

export default ContentCardList;

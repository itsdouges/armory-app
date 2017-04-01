// @flow

import styles from './styles.less';
import config from 'config';
import cx from 'classnames/bind';
import T from 'i18n-react';

import Icon from 'common/components/Icon';
import Placeholder from './placeholder';
import colours from 'common/styles/colours';

type CardData = {
  title: any,
  subTitle: string,
  imageStyle?: Object,
  imageClass?: string,
};

function extractData (content, { type, forceUpdate }): CardData {
  switch (type) {
    case 'users': {
      const alias = content.alias || content.name;
      const url = alias &&
        `${config.imagesEndpoint}${alias}/avatar${forceUpdate ? `?${+new Date()}` : ''}`;

      if (content.gw2Only) {
        return {
          title: content.name,
          subTitle: content.rank,
          imageClass: styles.anonymous,
        };
      }

      return {
        title: (
          <span>
            {content.commander && <Icon name="commander-red.png" />}
            {alias}
          </span>
        ),
        subTitle: content.accountName || 'No api key added...',
        imageStyle: {
          backgroundColor: colours._gray,
          backgroundImage: `url(${url})`,
          borderRadius: '50%',
        },
        imageClass: '',
      };
    }

    case 'characters':
      return {
        title: content.guild_tag ? `${content.name || 'Api Error.'} [${content.guild_tag}]` : content.name || 'Api Error.',
        // eslint-disable-next-line
        subTitle: content.level ? `${content.level} ${content.race} ${content.eliteSpecialization || content.profession}` : 'Api error.',
        imageClass: content.profession && content.profession.toLowerCase(),
        imageStyle: {},
      };

    case 'guilds':
      return {
        title: content.name || T.translate('guilds.noGuild'),
        subTitle: (content.tag && `[${content.tag}]`) || T.translate('guilds.guild'),
        imageStyle: {
          backgroundImage: `url(https://guilds.gw2w2w.com/guilds/${content.name && content.name.replace(/\s+/g, '-')}/256.svg)`,
          borderRadius: '50%',
        },
        imageClass: '',
      };

    case 'pet':
      return {
        title: content.name,
        subTitle: '',
        imageStyle: {
          backgroundImage: `url(${content.icon})`,
        },
        imageClass: '',
      };

    default:
      return { title: '', subTitle: '' };
  }
}

export type ContentType = 'characters' | 'users' | 'guilds' | 'pet';
type CardSize = 'small' | 'big';

type ContentCardProps = {
  content?: Object,
  className?: string,
  type?: ContentType,
  size?: CardSize,
  extraSubtitle?: any,
  forceUpdate?: boolean,
  children?: any,
  rightComponent?: any,
};

const ContentCard = ({
  content,
  className,
  type = 'characters',
  size = 'small',
  extraSubtitle,
  forceUpdate,
  children,
  rightComponent,
}: ContentCardProps) => {
  if (!content) {
    return <Placeholder size={size} className={className} rightComponent={rightComponent} />;
  }

  const {
    title,
    subTitle,
    imageClass,
    imageStyle,
  } = extractData(content, { type, size, forceUpdate });

  return (
    <div className={cx(styles.root, className, styles[size])}>
      <div className={cx(styles.image, styles[imageClass])} style={imageStyle}>
        {children}
      </div>

      <div className={styles.textContainer}>
        {size === 'big'
          ? <h2 className={styles.title}>{title}</h2>
          : <div className={styles.title}>{title}</div>

        }
        <div className={styles.subTitle}>
          {extraSubtitle}
          {subTitle}
        </div>
      </div>

      {rightComponent}
    </div>
  );
};

export default ContentCard;

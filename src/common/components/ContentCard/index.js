// @flow

import styles from './styles.less';
import config from 'config';
import cx from 'classnames';
import T from 'i18n-react';

import Icon from 'common/components/Icon';
import Placeholder from './placeholder';
import colours from 'common/styles/colours';

type CardData = {
  title: any,
  subTitle: string,
  imageStyle?: { [string]: ?string },
  imageUrl?: string,
  imageName?: string,
};

function extractData (content, { type, size, forceUpdate }): CardData {
  switch (type) {
    case 'users': {
      const alias = content.alias || content.name;
      const url = alias &&
        `${config.imagesEndpoint}${alias}/avatar${forceUpdate ? `?${+new Date()}` : ''}`;

      if (content.gw2Only) {
        return {
          title: content.name,
          subTitle: content.rank,
          imageName: 'svg/account-circle.svg',
        };
      }

      return {
        title: (
          <span>
            {content.commander && <Icon name="commander-red.png" />}
            {alias}
          </span>
        ),
        subTitle: content.accountName || T.translate('users.noApiKey'),
        imageStyle: {
          backgroundColor: colours._gray,
          borderRadius: '50%',
        },
        imageUrl: url,
        imageName: '',
      };
    }

    case 'characters': {
      const imageSuffix = size === 'small' ? `-${size}` : '';
      return {
        title: content.guild_tag ? `${content.name || 'Api Error.'} [${content.guild_tag}]` : content.name || 'Api Error.',
        subTitle: content.level ? `${content.level} ${content.race} ${content.eliteSpecialization || content.profession}` : 'Api error.',
        imageName: `${content.profession && content.profession.toLowerCase()}-icon${imageSuffix}.png`,
        imageStyle: {},
      };
    }

    case 'guilds':
      return {
        title: content.name || T.translate('guilds.noGuild'),
        subTitle: (content.tag && `[${content.tag}]`) || T.translate('guilds.guild'),
        imageStyle: {
          borderRadius: '50%',
        },
        imageName: '',
        imageUrl: `https://guilds.gw2w2w.com/guilds/${content.name && content.name.replace(/\s+/g, '-')}/256.svg`,
      };

    case 'pet':
      return {
        title: content.name,
        imageUrl: content.icon,
        subTitle: '',
        imageName: '',
      };

    default:
      return { title: '', subTitle: '' };
  }
}

export type ContentType = 'characters' | 'users' | 'guilds' | 'pet';
type CardSize = 'small' | 'big';

export type Props = {
  content?: Object,
  className?: string,
  type?: ContentType,
  size?: CardSize,
  extraSubtitle?: any,
  forceUpdate?: boolean,
  children?: any,
};

const ContentCard = ({
  content,
  className,
  type = 'characters',
  size = 'small',
  extraSubtitle,
  forceUpdate,
  children,
}: Props) => {
  if (!content) {
    return <Placeholder size={size} className={className} />;
  }

  const {
    title,
    subTitle,
    imageName,
    imageStyle,
    imageUrl,
  } = extractData(content, { type, size, forceUpdate });

  return (
    <div className={cx(styles.root, className, styles[size])}>
      <Icon className={cx(styles.image)} src={imageUrl} name={imageName} style={imageStyle}>
        {children}
      </Icon>

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
    </div>
  );
};

export default ContentCard;

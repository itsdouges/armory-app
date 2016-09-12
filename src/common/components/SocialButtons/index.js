import { ShareButtons, generateShareIcon } from 'react-share';

import config from 'env';
import styles from './styles.less';

const {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  VKShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const VKIcon = generateShareIcon('vk');

const SocialButtons = () => {
  const socialProps = {
    url: window.location.href,
    title: 'Guild Wars 2 Armory',
    className: styles.icon,
  };

  const iconProps = {
    size: 40,
  };

  return (
    <div className={styles.root}>
      <FacebookShareButton {...socialProps} description={config.description}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>

      <TwitterShareButton {...socialProps} hashtags={['gw2', 'guildwars2', 'gw2armory']}>
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>

      <GooglePlusShareButton {...socialProps}>
        <GooglePlusIcon {...iconProps} />
      </GooglePlusShareButton>

      <VKShareButton {...socialProps}>
        <VKIcon {...iconProps} />
      </VKShareButton>
    </div>
  );
};

export default SocialButtons;

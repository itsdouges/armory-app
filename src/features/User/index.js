import styles from './styles.less';
import CharactersList from 'common/components/CharactersList';
import Avatar from 'common/components/Avatar';

export default () => (
  <div className={styles.container}>
    <Avatar />
    <CharactersList />
  </div>
);

// @flow

import type { AchievementCategories } from 'flowTypes';

import SvgIcon from 'common/components/Icon/Svg';

import Category from '../Category';
import styles from './styles.less';

type Props = {
  name: string,
  categories: Array<number>,
  categoryData: AchievementCategories,
  selected: boolean,
  onClick: () => void,
};

const AchievementGroup = ({ name, categories, categoryData, selected, onClick }: Props) => (
  <div className={{ [styles.selected]: selected }}>
    <Category
      name={name}
      icon={<SvgIcon name="arrow-down" className={styles.icon} onClick={onClick} />}
    />

    <ol>
      {categories.map((id) =>
        <li key={id}>
          <Category {...categoryData[id]} className={styles.category} />
        </li>)}
    </ol>
  </div>
);

export default AchievementGroup;

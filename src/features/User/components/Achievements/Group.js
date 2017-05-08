// @flow

import type { AchievementCategories } from 'flowTypes';

import Category from './Category';
import styles from './styles.less';

type Props = {
  name: string,
  categories: Array<number>,
  categoryData: AchievementCategories,
};

const AchievementGroup = ({ name, categories, categoryData }: Props) => (
  <div>
    {name}

    <ol>
      {categories.map((id) =>
        <li key={id}>
          <Category {...categoryData[id]} className={styles.category} />
        </li>)}
    </ol>
  </div>
);

export default AchievementGroup;

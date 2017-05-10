// @flow

import Background from './Background';
import styles from './Skill/styles.less';

const ItemsTooltip = ({ data }: any) => {
  return (
    <Background>
      <div className={styles.title}>{data.name}</div>

      {data.requirement}

      {data.description && (
        <span>
          <br /><br />
          {data.description}
        </span>
      )}
    </Background>
  );
};

export default ItemsTooltip;

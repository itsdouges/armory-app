import { PropTypes } from 'react';
import reduce from 'lodash/reduce';
import maxBy from 'lodash/maxBy';
import upperFirst from 'lodash/upperFirst';

import Summary from 'common/layouts/Summary';
import Icon from 'common/components/Icon';

const calculateFavouriteProfession = (professions) => {
  if (!professions) {
    return { name: '...', count: 0 };
  }

  const professionCounts = reduce(professions, (acc, value, key) => {
    // eslint-disable-next-line
    acc.push({ name: key, count: reduce(value, (total, value) => (total += value) && total, 0) });
    return acc;
  }, []);

  return maxBy(professionCounts, ({ count }) => count);
};

const FavouriePvpClass = ({ professions }) => {
  const { name, count } = calculateFavouriteProfession(professions);

  return (
    <Summary
      leftIcon={<Icon name={`${name}-icon.png`} size="large" />}
      title={`Favourite Profession: ${upperFirst(name)}`}
      subTitle={`Played ${count} times`}
    />
  );
};

FavouriePvpClass.propTypes = {
  professions: PropTypes.object,
};

export default FavouriePvpClass;

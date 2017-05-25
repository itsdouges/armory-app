import reduce from 'lodash/reduce';
import maxBy from 'lodash/maxBy';
import upperFirst from 'lodash/upperFirst';
import T from 'i18n-react';

import Redacted from 'common/components/Redacted';
import Summary from 'common/layouts/Summary';

const calculateFavouriteProfession = (professions) => {
  if (!professions) {
    return { name: 'engineer', count: 0 };
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
  const redact = count === 0;

  return (
    <Summary
      leftIcon={{ name: `${name}-icon.png`, size: 'large' }}
      title={
        <Redacted redact={redact}>
          {`${T.translate('users.pvp.favouriteClass')}: ${upperFirst(name)}`}
        </Redacted>
      }
      subTitle={
        <span>
          <Redacted redact={redact}>
            {`${T.translate('words.played')} ${count} ${T.translate('words.times')}`}
          </Redacted>
        </span>
      }
    />
  );
};

export default FavouriePvpClass;

import styles from './styles.less';
import { PropTypes } from 'react';
import ProgressBar from 'common/components/ProgressBar';
import Redacted from 'common/components/Redacted';

function calculateRankExperience (rank) {
  if (!rank || rank <= 1) {
    return 0;
  } else if (rank >= 2 && rank <= 5) {
    return 500;
  } else if (rank >= 6 && rank <= 8) {
    return 1500;
  } else if (rank >= 9 && rank <= 18) {
    return 4000;
  } else if (rank >= 19 && rank <= 28) {
    return 7500;
  } else if (rank >= 29 && rank <= 38) {
    return 15000;
  }

  return 20000;
}

function calculateExperienceInCurrentLevel (rank, rankPoints) {
  let totalExperienceForNextLevel = 0;
  const nextLevel = rank;

  for (let i = 1; i <= nextLevel; i++) {
    totalExperienceForNextLevel += calculateRankExperience(i);
  }

  return Math.abs(totalExperienceForNextLevel - rankPoints);
}

function calculateIconStyle (rank) {
  let name;

  if (!rank || rank <= 9) {
    name = 'Rabbit';
  } else if (rank >= 10 && rank <= 19) {
    name = 'Deer';
  } else if (rank >= 20 && rank <= 29) {
    name = 'Dolyak';
  } else if (rank >= 30 && rank <= 39) {
    name = 'Wolf';
  } else if (rank >= 40 && rank <= 49) {
    name = 'Tiger';
  } else if (rank >= 50 && rank <= 59) {
    name = 'Bear';
  } else if (rank >= 60 && rank <= 69) {
    name = 'Shark';
  } else {
    name = 'Phoenix';
  }

  return {
    name,
    image: require(`assets/images/pvp/${name.toLowerCase()}.png`),
  };
}

function calculateRanking (rank, points) {
  const current = calculateExperienceInCurrentLevel(rank, points) || 0;
  const max = calculateRankExperience(rank);
  const { name, image } = calculateIconStyle(rank);

  return {
    current,
    max,
    name,
    image,
  };
}

const PvpRanking = ({ rank, points, rankRollOvers }) => {
  const rolledOverRank = (rank + rankRollOvers) || 0;
  const { image, name, current, max } = calculateRanking(rank, points);

  return (
    <div className={styles.root}>
      <Redacted redact={!rank}>
        <div className={styles.icon} style={{ backgroundImage: `url(${image})` }} />
      </Redacted>

      <div className={styles.progressContainer}>
        <span className={styles.name}>
          <Redacted redact={!rank}>{name} ({rolledOverRank})</Redacted>
        </span>

        <ProgressBar
          barColor="rgb(85, 35, 164)"
          backgroundColor="rgb(41, 41, 41)"
          current={current}
          max={max}
        />
      </div>
    </div>
  );
};

PvpRanking.propTypes = {
  rank: PropTypes.number,
  points: PropTypes.number,
  rankRollOvers: PropTypes.number,
};

export default PvpRanking;

import { PropTypes } from 'react';
import reduce from 'lodash/reduce';
import get from 'lodash/get';

import Summary from 'common/layouts/Summary';
import Icon from 'common/components/Icon';

const rankToTitleMapping = {
  1: 'Invader',
  5: 'Assaulter',
  10: 'Raider',
  15: 'Recruit',
  20: 'Scout',
  30: 'Soldier',
  40: 'Squire',
  50: 'Footman',
  60: 'Knight',
  70: 'Major',
  80: 'Colonel',
  90: 'General',
  100: 'Veteran',
  110: 'Champion',
  120: 'Legend',
  150: 'Bronze Invader',
  180: 'Bronze Assaulter',
  210: 'Bronze Raider',
  240: 'Bronze Recruit',
  270: 'Bronze Scout',
  300: 'Bronze Soldier',
  330: 'Bronze Squire',
  360: 'Bronze Footman',
  390: 'Bronze Knight',
  420: 'Bronze Major',
  450: 'Bronze Colonel',
  480: 'Bronze General',
  510: 'Bronze Veteran',
  540: 'Bronze Champion',
  570: 'Bronze Legend',
  620: 'Silver Invader',
  670: 'Silver Assaulter',
  720: 'Silver Raider',
  770: 'Silver Recruit',
  820: 'Silver Scout',
  870: 'Silver Soldier',
  920: 'Silver Squire',
  970: 'Silver Footman',
  1020: 'Silver Knight',
  1070: 'Silver Major',
  1120: 'Silver Colonel',
  1170: 'Silver General',
  1220: 'Silver Veteran',
  1270: 'Silver Champion',
  1320: 'Silver Legend',
  1395: 'Gold Invader',
  1470: 'Gold Assaulter',
  1545: 'Gold Raider',
  1620: 'Gold Recruit',
  1695: 'Gold Scout',
  1770: 'Gold Soldier',
  1845: 'Gold Squire',
  1920: 'Gold Footman',
  1995: 'Gold Knight',
  2070: 'Gold Major',
  2145: 'Gold Colonel',
  2220: 'Gold General',
  2295: 'Gold Veteran',
  2370: 'Gold Champion',
  2445: 'Gold Legend',
  2545: 'Platinum Invader',
  2645: 'Platinum Assaulter',
  2745: 'Platinum Raider',
  2845: 'Platinum Recruit',
  2945: 'Platinum Scout',
  3045: 'Platinum Soldier',
  3145: 'Platinum Squire',
  3245: 'Platinum Footman',
  3345: 'Platinum Knight',
  3445: 'Platinum Major',
  3545: 'Platinum Colonel',
  3645: 'Platinum General',
  3745: 'Platinum Veteran',
  3845: 'Platinum Champion',
  3945: 'Platinum Legend',
  4095: 'Mithril Invader',
  4245: 'Mithril Assaulter',
  4395: 'Mithril Raider',
  4545: 'Mithril Recruit',
  4695: 'Mithril Scout',
  4845: 'Mithril Soldier',
  4995: 'Mithril Squire',
  5145: 'Mithril Footman',
  5295: 'Mithril Knight',
  5445: 'Mithril Major',
  5595: 'Mithril Colonel',
  5745: 'Mithril General',
  5895: 'Mithril Veteran',
  6045: 'Mithril Champion',
  6195: 'Mithril Legend',
  6445: 'Diamond Invader',
  6695: 'Diamond Assaulter',
  6945: 'Diamond Raider',
  7195: 'Diamond Recruit',
  7445: 'Diamond Scout',
  7695: 'Diamond Soldier',
  7945: 'Diamond Squire',
  8195: 'Diamond Footman',
  8445: 'Diamond Knight',
  8695: 'Diamond Major',
  8945: 'Diamond Colonel',
  9195: 'Diamond General',
  9445: 'Diamond Veteran',
  9695: 'Diamond Champion',
  9945: 'Diamond Legend',
};

const WvwRank = ({ rank, worldId, worlds }) => {
  const world = worlds[worldId];
  const worldName = get(world, 'name', 'Unknown');

  const rankName = reduce(rankToTitleMapping, (selectedName, wvwRankName, wvwRank) => (
    (rank || 1) >= wvwRank ? wvwRankName : selectedName
  ), '');

  return (
    <Summary
      leftIcon={<Icon name="wvw.png" size="xlarge" />}
      title={`WvW Rank (${rank || 1})`}
      subTitle={`${rankName} for ${worldName}`}
    />
  );
};

WvwRank.propTypes = {
  rank: PropTypes.number,
  worldId: PropTypes.number,
  worlds: PropTypes.object,
};

export default WvwRank;

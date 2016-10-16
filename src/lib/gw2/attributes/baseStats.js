const BEGINNING_STAT = 37;

export function calculateBaseStats (level) {
  let stat = BEGINNING_STAT;

  for (let i = 2; i <= level; i += 1) {
    if (i <= 10) {
      stat += 7;
    } else if (i % 2 !== 0) {
      continue;
    } else if (i <= 20) {
      stat += 10;
    } else if (i <= 24) {
      stat += 14;
    } else if (i <= 26) {
      stat += 15;
    } else if (i <= 30) {
      stat += 16;
    } else if (i <= 40) {
      stat += 20;
    } else if (i <= 44) {
      stat += 24;
    } else if (i <= 46) {
      stat += 25;
    } else if (i <= 50) {
      stat += 26;
    } else if (i <= 60) {
      stat += 30;
    } else if (i <= 64) {
      stat += 34;
    } else if (i <= 66) {
      stat += 35;
    } else if (i <= 70) {
      stat += 36;
    } else if (i <= 74) {
      stat += 44;
    } else if (i <= 76) {
      stat += 45;
    } else {
      stat += 46;
    }
  }

  return stat;
}

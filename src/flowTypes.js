export type Character = {};

export type User = {};

export type Guild = {
  tag: string,
  claimed: boolean,
  characters?: Array<Character>,
  users?: Array<User>,
  motd?: string,
  aetherium?: number,
  influence?: number,
  resonance?: number,
  favor?: number,
  level?: number,
};

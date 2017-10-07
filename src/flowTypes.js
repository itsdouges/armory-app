// @flow

export type Character = {
  race: string,
  alias: string,
  name: string,
  guild: string,
  guild_tag: string,
  guild_name: string,
  profession: string,
  eliteSpecialization: string,
  level: number,
  privacy: Array<string>,
};

export const defaultCharacter: Character = {
  race: '',
  alias: '',
  name: '',
  guild: '',
  guild_tag: '',
  guild_name: '',
  profession: '',
  eliteSpecialization: '',
  level: 0,
  privacy: [],
};

type PvpGame = {
  id: string,
};

export type PvpStanding = {
  name: string,
  seasonId: string,
  totalPointsCurrent: number,
  divisionCurrent: number,
  pointsCurrent: number,
  repeatsCurrent: number,
  ratingCurrent: number,
  decayCurrent: number,
  alias: string,
  accountName: string,
  wins: ?number,
  losses: ?number,
};

export type User = {
  fractalLevel: number,
  wvwRank: number,
  world: number,
  access: Array<string>,
  characters: Array<Character>,
  pvpStandings?: Array<any>,
  pvpGames?: Array<PvpGame>,
  alias: string,
  wins: ?number,
  losses: ?number,
  valid: boolean,
  privacy: Array<string>,
};

export type Token = {
  accountName: string,
  primary: boolean,
  permissions: string,
  valid: boolean,
  token: string,
};

export type AuthenticatedUser = User & {
  validGw2Token: boolean,
  validatingGw2Token: boolean,
  gw2Tokens: Array<Token>,
  gw2TokenError: string,
  addingGw2Token: boolean,
  passwordValid: boolean,
  passwordErrors: string,
  changingPassword: boolean,
  passwordSuccess: string,
  emailErrors: string,
  emailValid: boolean,
  aliasErrors: string,
  aliasValid: boolean,
  registering: boolean,
};

export type Item = {
  icon: string,
  name: string,
  id: number,
  rarity: string,
  level: number,
  type: string,
  details: {
    type: string,
  },
};

export const defaultUser: User = {
  fractalLevel: 0,
  wvwRank: 0,
  world: 0,
  access: [],
  characters: [],
  alias: '',
  wins: null,
  losses: null,
  valid: true,
  privacy: [],
};

// See: https://wiki.guildwars2.com/wiki/API:2/guild/:id/log
type Log = {
  id: number,
  time: string,
  type: string,
  user: string,
  count: number,
  motd: string,
  invited_by: string,
  kicked_by: string,
  changed_by: string,
  old_rank: string,
  new_rank: string,
  item_id: number,
  count: number,
  operation: 'deposit' | 'withdraw',
  activity: string,
  coins: number,
  action: 'queued' | 'cancelled' | 'completed' | 'sped_up',
  upgrade_id: number,
};

export type Guild = {
  tag: string,
  name: string,
  claimed: boolean,
  characters: Array<Character>,
  logs?: Array<Log>,
  users: Array<User>,
  motd?: string,
  aetherium?: number,
  influence?: number,
  resonance?: number,
  favor?: number,
  level?: number,
  members?: Array<User>,
  privacy: Array<string>,
  leader?: {
    accountName: string,
    alias: string,
  },
};

export const defaultGuild: Guild = {
  tag: '',
  name: '',
  claimed: false,
  characters: [],
  users: [],
  privacy: [],
};

export type PvpSeasons = {
};

export type Worlds = {
};

export type Maps = {
};

export type Items = {
};

export type ItemStats = {
};

export type Skins = {
};

export type Amulets = {
};

export type Skills = {
};

export type Professions = {
};

export type AchievementGroups = {
};

export type AchievementCategories = {
};

export type Achievements = {};

type Gw2Data = {
  error?: string,
};

export type CharactersList = Array<*>;

export type Pets = {};

export type Bags = Array<any>;

type Specialization = Gw2Data & {
  name: string,
  background: string,
  minor_traits: Array<number>,
  major_traits: Array<number>,
  name?: string,
  background?: string,
};

export type Specializations = {
  [key: number]: Specialization,
};

export type Traits = {
  [number]: {
    icon?: string,
    name: string,
  },
};

export type Paginated<T> = {
  rows: Array<T>,
  count: number,
  limit: number,
  skip: number,
};

export type Gw2PvpGame = {
  map_id: string,
  scores: {
    red: number,
    blue: number,
  },
  rating_type: string,
  team: 'red' | 'blue',
  result: string,
  profession: string,
  ended: string,
  rating_change: number,
};

export type Gw2Map = {
  id: string,
  name: string,
};

export type Gw2Title = {};

export type Gw2Titles = Array<Gw2Title>;
export type Notification = {
  id: string,
  message: string,
  type: 'info' | 'error',
};

export type Notifications = {
  [key: string]: Notification,
};

export type UserAchievementsMap = {};

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
};

export type User = {
  fractalLevel: number,
  wvwRank: number,
  world: number,
  characters: [],
  access: string,
};

export const defaultUser: User = {
  fractalLevel: 0,
  wvwRank: 0,
  world: 0,
  characters: [],
  access: '',
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
};

export const defaultGuild: Guild = {
  tag: '',
  name: '',
  claimed: false,
  characters: [],
  users: [],
};

export type PvpSeasons = {};

export type Worlds = {};

export type Maps = {};

export type Items = {};

export type Skins = {};

export type Amulets = {};

export type Skills = {};

export type Professions = {};

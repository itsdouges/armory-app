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

export type Guild = {
  tag: string,
  name: string,
  claimed: boolean,
  characters: Array<Character>,
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

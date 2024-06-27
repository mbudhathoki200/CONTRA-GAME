type canvas = {
  WIDTH: number;
  HEIGHT: number;
};

export const CANVAS: canvas = {
  WIDTH: 1000,
  HEIGHT: 221 * 2,
};

/*------------------------------------MAP CONSTANTS----------------------------------------*/

type map = {
  WIDTH: number;
  HEIGHT: number;
};

export const MAP: map = {
  WIDTH: 3339 * 2,
  HEIGHT: 221 * 2,
};

/* ---------------------------------Player Constants----------------------------------------*/

type player = {
  WIDTH: number;
  HEIGHT: number;
  SPEED: number;
  LIFE: number;
  JUMP_POWER: number;
  GRAVITY: number;
  SCORE: number;
  RESPAWN_POSITION_X: number;
  RESPAWN_POSITION_Y: number;
};

export const PLAYER: player = {
  WIDTH: 33,
  HEIGHT: 72,
  SPEED: 8,
  LIFE: 30,
  JUMP_POWER: 6,
  GRAVITY: 0.5,
  SCORE: 0,
  RESPAWN_POSITION_X: 40,
  RESPAWN_POSITION_Y: 100,
};

/* ---------------------------------PLAYER SPRITE CONSTANTS----------------------------------------*/
type playerSprite = {
  WIDTH: number;
  HEIGHT: number;
  COLUMNS: number;
};

export const PLAYER_SPRITE: playerSprite = {
  WIDTH: 116,
  HEIGHT: 50,
  COLUMNS: 5,
};

/* ---------------------------------BULLET SPRITE CONSTANTS----------------------------------------*/

type bulletSprite = {
  WIDTH: number;
  HEIGHT: number;
};
export const BULLET_SPRITE: bulletSprite = {
  WIDTH: 15,
  HEIGHT: 15,
};

type bullet = {
  SPEED: number;
  SLOW_SPEED: number;
};

export const BULLET: bullet = {
  SPEED: 7,
  SLOW_SPEED: 5,
};

/* ---------------------------------ENEMY CONSTANTS----------------------------------------*/

type enemy = {
  WIDTH: number;
  HEIGHT: number;
  SPEED: number;
};

export const ENEMY: enemy = {
  WIDTH: 33,
  HEIGHT: 72,
  SPEED: 4,
};

/* ---------------------------------STATIC ENEMY----------------------------------------*/

type Tank = {
  WIDTH: number;
  HEIGHT: number;
  CANNON_SPEED: number;
  HEALTH: number;
};

export const TANK: Tank = {
  WIDTH: 40,
  HEALTH: 30,
  HEIGHT: 40,
  CANNON_SPEED: 6,
};

/*-----------------------------------Poweer UP------------------------------------------*/
type powerup = {
  WIDTH: number;
  HEIGHT: number;
};
export const POWER_UP: powerup = {
  WIDTH: 50,
  HEIGHT: 25,
};

/*------------------------------------Explosion-------------------------------------------*/
type explosion = {
  PLAYER_SIZE: number;
  TANK_SIZE: number;
};
export const EXPLOSION: explosion = {
  PLAYER_SIZE: 60,
  TANK_SIZE: 80,
};

/*------------------------------------SCORE-------------------------------------------*/
type score = {
  RUNNING_ENEMY: number;
  TANK: number;
  MAIN_TANK: number;
  GUARD_ENEMY: number;
};
export const SCORE: score = {
  RUNNING_ENEMY: 10,
  TANK: 20,
  MAIN_TANK: 30,
  GUARD_ENEMY: 15,
};

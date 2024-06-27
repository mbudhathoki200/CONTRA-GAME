export type sprite = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type powerupsprite = {
  extraHealth: sprite;
  extraPoints: sprite;
  specialMove: sprite;
};
export const powerupSprite: powerupsprite = {
  extraHealth: {
    x: 291,
    y: 143,
    height: 22,
    width: 27,
  },
  extraPoints: {
    x: 100,
    y: 143,
    height: 22,
    width: 27,
  },
  specialMove: {
    x: 182,
    y: 141,
    height: 22,
    width: 27,
  },
};

export const blockPowerupSprite: sprite[] = [
  {
    x: 40,
    y: 6,
    height: 30,
    width: 30,
  },
  {
    x: 74,
    y: 6,
    height: 30,
    width: 30,
  },
  {
    x: 107,
    y: 5,
    height: 32,
    width: 32,
  },
  {
    x: 176,
    y: 5,
    height: 30,
    width: 30,
  },
  {
    x: 211,
    y: 4,
    height: 32,
    width: 28,
  },
  {
    x: 245,
    y: 4,
    height: 32,
    width: 28,
  },
];

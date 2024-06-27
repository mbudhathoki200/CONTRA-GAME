export type sprite = {
  x: number;
  y: number;
  height: number;
  width: number;
};
type bulletsprite = {
  player: sprite;
  enemy: sprite;
  tankCannon: sprite;
  specialRay: sprite;
  specialFire: sprite[];
};
export const bulletSprite: bulletsprite = {
  player: {
    x: 260,
    y: 501,
    height: 3,
    width: 3,
  },
  enemy: {
    x: 256,
    y: 502,
    height: 3,
    width: 3,
  },
  tankCannon: {
    x: 233,
    y: 267,
    height: 20,
    width: 20,
  },
  specialRay: {
    x: 218,
    y: 494,
    height: 14,
    width: 19,
  },
  specialFire: [
    {
      x: 195,
      y: 459,
      height: 19,
      width: 20,
    },
    {
      x: 214,
      y: 459,
      height: 19,
      width: 19,
    },
    {
      x: 233,
      y: 459,
      height: 19,
      width: 18,
    },
    {
      x: 251,
      y: 459,
      height: 19,
      width: 20,
    },
  ],
};

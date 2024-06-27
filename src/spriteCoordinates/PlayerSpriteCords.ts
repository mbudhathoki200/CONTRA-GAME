export type sprite = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export const runningRight: sprite[] = [
  {
    x: 142,
    y: 16,
    height: 39,
    width: 27,
  },
  {
    x: 144,
    y: 132,
    height: 39,
    width: 22,
  },
  {
    x: 168,
    y: 130,
    height: 39,
    width: 20,
  },
  {
    x: 189,
    y: 130,
    height: 39,
    width: 24,
  },
  {
    x: 218,
    y: 131,
    height: 36,
    width: 23,
  },
  {
    x: 241,
    y: 130,
    height: 39,
    width: 23,
  },
];

export const runningLeft: sprite[] = [
  {
    x: 80,
    y: 16,
    height: 36,
    width: 24,
  },
  {
    x: 113,
    y: 132,
    height: 38,
    width: 23,
  },
  {
    x: 92,
    y: 132,
    height: 37,
    width: 19,
  },
  {
    x: 67,
    y: 132,
    height: 37,
    width: 23,
  },
  {
    x: 40,
    y: 130,
    height: 39,
    width: 23,
  },
  {
    x: 18,
    y: 128,
    height: 41,
    width: 22,
  },
];

export const jumpingSprite: sprite[] = [
  {
    x: 180,
    y: 172,
    height: 19,
    width: 19,
  },
  {
    x: 204,
    y: 172,
    height: 19,
    width: 19,
  },
  {
    x: 223,
    y: 172,
    height: 19,
    width: 19,
  },
  {
    x: 246,
    y: 172,
    height: 19,
    width: 19,
  },
];
export const playerPronePosition = {
  right: {
    x: 144,
    y: 174,
    height: 18,
    width: 39,
  },
  left: {
    x: 99,
    y: 174,
    height: 18,
    width: 39,
  },
};

export const playerTargetUp = {
  left: {
    x: 58,
    y: 6,
    height: 47,
    width: 21,
  },

  right: {
    x: 202,
    y: 4,
    height: 50,
    width: 18,
  },
};
export const TargetUpLR = {
  left: {
    x: 117,
    y: 53,
    height: 40,
    width: 21,
  },
  right: {
    x: 142,
    y: 53,
    height: 40,
    width: 21,
  },
};
export const playerTargetDown = {
  left: {
    x: 113,
    y: 93,
    height: 37,
    width: 25,
  },
  right: {
    x: 141,
    y: 93,
    height: 37,
    width: 25,
  },
};

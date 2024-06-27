/* -------------------------- Running Enemy Coords -------------------------- */
export type sprite = {
  x: number;
  y: number;
  height: number;
  width: number;
};
export type RunningEnemy = {
  runningLeft: sprite[];
  runningRight: sprite[];
};
export const runningEnemy: RunningEnemy = {
  runningLeft: [
    {
      x: 286,
      y: 3,
      height: 49,
      width: 34,
    },
    {
      x: 262,
      y: 4,
      height: 47,
      width: 23,
    },
    {
      x: 230,
      y: 3,
      height: 47,
      width: 31,
    },
    {
      x: 191,
      y: 3,
      height: 42,
      width: 40,
    },
    {
      x: 150,
      y: 3,
      height: 45,
      width: 40,
    },
    {
      x: 95,
      y: 0,
      height: 53,
      width: 24,
    },
    {
      x: 63,
      y: 0,
      height: 53,
      width: 34,
    },
    {
      x: 21,
      y: 2,
      height: 49,
      width: 40,
    },
  ],
  runningRight: [
    {
      x: 320,
      y: 3,
      height: 47,
      width: 33,
    },
    {
      x: 355,
      y: 3,
      height: 47,
      width: 24,
    },
    {
      x: 379,
      y: 3,
      height: 44,
      width: 31,
    },
    {
      x: 410,
      y: 3,
      height: 43,
      width: 42,
    },
    {
      x: 451,
      y: 2,
      height: 43,
      width: 39,
    },
    {
      x: 489,
      y: 3,
      height: 43,
      width: 30,
    },
    {
      x: 522,
      y: 3,
      height: 48,
      width: 22,
    },
    {
      x: 546,
      y: 1,
      height: 48,
      width: 34,
    },
  ],
};

/* ----------------------- Gun Enemy Sprite Coords ---------------------- */
export type GunEnemy = {
  left: sprite;
  right: sprite;
  up: sprite;
  down: sprite;
  upLeft: sprite;
  upRight: sprite;
  downLeft: sprite;
  downRight: sprite;
};
export const gunEnemy: GunEnemy = {
  left: {
    x: 96,
    y: 257,
    height: 51,
    width: 39,
  },
  up: {
    x: 349,
    y: 247,
    height: 61,
    width: 26,
  },
  down: {
    x: 481,
    y: 311,
    height: 47,
    width: 29,
  },
  right: {
    x: 586,
    y: 257,
    height: 51,
    width: 38,
  },
  upLeft: {
    x: 203,
    y: 247,
    height: 62,
    width: 33,
  },
  upRight: {
    x: 474,
    y: 249,
    height: 60,
    width: 29,
  },
  downLeft: {
    x: 253,
    y: 311,
    height: 47,
    width: 33,
  },
  downRight: {
    x: 391,
    y: 311,
    height: 47,
    width: 33,
  },
};

/* -------------------------- Turret Sprite Coords -------------------------- */
export type turretSprites = {
  closed: sprite;
  opening: sprite;
  left: sprite;
  right: sprite;
  up: sprite;
  down: sprite;
  upLeft: sprite;
  upRight: sprite;
  downLeft: sprite;
  downRight: sprite;
};
export const turretSprites: turretSprites = {
  closed: {
    x: 37,
    y: 106,
    height: 32,
    width: 32,
  },
  opening: {
    x: 39,
    y: 72,
    height: 32,
    width: 32,
  },
  left: {
    x: 5,
    y: 106,
    height: 32,
    width: 32,
  },
  right: {
    x: 72,
    y: 106,
    height: 32,
    width: 32,
  },
  up: {
    x: 39,
    y: 39,
    height: 32,
    width: 32,
  },
  down: {
    x: 38,
    y: 175,
    height: 32,
    width: 32,
  },
  upLeft: {
    x: 5,
    y: 39,
    height: 32,
    width: 32,
  },
  upRight: {
    x: 73,
    y: 39,
    height: 32,
    width: 32,
  },
  downLeft: {
    x: 5,
    y: 175,
    height: 32,
    width: 32,
  },
  downRight: {
    x: 72,
    y: 175,
    height: 32,
    width: 32,
  },
};
/* ------------------------------- Tank Sprite ------------------------------ */
export type tanksprites = {
  new: sprite[];
  hit: sprite;
  destroyed: sprite[];
};

export const tankSprites: tanksprites = {
  new: [
    {
      x: 73,
      y: 222,
      height: 20,
      width: 34,
    },

    {
      x: 107,
      y: 216,
      height: 26,
      width: 34,
    },

    {
      x: 140,
      y: 208,
      height: 33,
      width: 34,
    },
  ],
  hit: {
    x: 141,
    y: 242,
    height: 33,
    width: 34,
  },
  destroyed: [
    {
      x: 73,
      y: 290,
      height: 20,
      width: 33,
    },

    {
      x: 108,
      y: 284,
      height: 26,
      width: 34,
    },

    {
      x: 141,
      y: 275,
      height: 35,
      width: 34,
    },
  ],
};
/* ----------------------------------- -- ----------------------------------- */

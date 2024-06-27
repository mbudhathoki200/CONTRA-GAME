interface IPlatfrom {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
}
export class Platfrom implements IPlatfrom {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;

  constructor(x: number, y: number, width: number, height: number, id: string) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.id = id;
  }
}

import explosionImage from "../assets/images/Contra-Extras.gif";
import { EXPLOSION } from "../constants/constant";
import {
  extraSprite,
  normalExplosionSprite,
} from "../spriteCoordinates/ExtraSpriteCords";

export const explosionArray: Explosion[] = [];

type explosion = {
  positionX: number;
  positionY: number;
};

export class Explosion implements explosion {
  positionX: number;
  positionY: number;

  explosionImage: HTMLImageElement;
  frame: number;
  size: number;
  animationTimer: number;
  removeExplosion: boolean;

  spriteState: extraSprite;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;

    this.explosionImage = new Image();
    this.explosionImage.src = explosionImage;

    this.size = EXPLOSION.PLAYER_SIZE;

    this.frame = 0;
    this.animationTimer = 0;
    this.removeExplosion = false;

    this.spriteState = normalExplosionSprite[this.frame];
  }
  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.spriteState;
    ctx.drawImage(
      this.explosionImage,
      x,
      y,
      width,
      height,
      this.positionX,
      this.positionY,
      this.size,
      this.size
    );
  }
  /**
   * The `update` function increments the frame of an explosion animation sprite every 5 animation timer
   * ticks until reaching the last frame, then sets a timeout to remove the explosion after a specified
   * end time.
   */
  update() {
    const lastFrame = normalExplosionSprite.length - 1;

    const endTime = 100;

    this.animationTimer++;

    if (this.animationTimer % 5 === 0 && this.frame < lastFrame) {
      this.frame++;

      this.spriteState = normalExplosionSprite[this.frame];
    } else if (this.frame >= lastFrame) {
      setTimeout(() => {
        this.removeExplosion = true;
      }, endTime);
    }
  }
}

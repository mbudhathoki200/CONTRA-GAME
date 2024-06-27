import healthPowerUp from "../assets/images/healthPowerSprite.png";
import { PLAYER, POWER_UP } from "../constants/constant";
import Map from "./Map";

export const powerUpArray: powerUP[] = [];
export class powerUP {
  positionX: number;
  positionY: number;
  Image: HTMLImageElement;
  height: number;
  width: number;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX + Map.offsetX;
    this.positionY = positionY;
    this.Image = new Image();
    this.Image.src = healthPowerUp;
    this.height = POWER_UP.HEIGHT;
    this.width = POWER_UP.WIDTH;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.Image,
      this.positionX - Map.offsetX,
      this.positionY + PLAYER.HEIGHT / 2,
      this.width,
      this.height
    );
  }
}

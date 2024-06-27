import powerUpBlockImage from "../assets/images/Contra-Tanks.gif";
import { TANK } from "../constants/constant";
import Map from "./Map";
import Player from "./Player";
import {
  blockPowerupSprite,
  sprite,
} from "../spriteCoordinates/powerUpSprites";

export const powerUpBlocks: PowerUpBox[] = [];
interface IPowerUpBox {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export class PowerUpBox implements IPowerUpBox {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  powerUpBlockImage: HTMLImageElement;

  powerUpAction: sprite;
  AnimationRange: number;

  // New properties for animation
  frameIndex: number;
  frameDelay: number;
  frameCounter: number;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;

    this.width = TANK.WIDTH;
    this.height = TANK.HEIGHT;

    this.powerUpBlockImage = new Image();
    this.powerUpBlockImage.src = powerUpBlockImage;

    this.powerUpAction = blockPowerupSprite[0]; // Start with the first sprite

    this.AnimationRange = 500;

    // Initialize animation properties
    this.frameIndex = 0;
    this.frameDelay = 25; //animation speed
    this.frameCounter = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.powerUpAction;
    ctx.drawImage(
      this.powerUpBlockImage,
      x,
      y,
      width,
      height,
      this.positionX - Map.offsetX,
      this.positionY,
      this.width,
      this.height
    );
  }

  update(player: Player) {
    if (this.isPlayerInRange(player)) {
      this.changePowerUpSprite();
    }
  }

  changePowerUpSprite() {
    this.frameCounter++;
    if (this.frameCounter >= this.frameDelay) {
      this.frameCounter = 0;
      this.frameIndex = (this.frameIndex + 1) % blockPowerupSprite.length;
      this.powerUpAction = blockPowerupSprite[this.frameIndex];
    }
  }

  isPlayerInRange(player: Player): boolean {
    let { positionX: playerX, positionY: playerY } = player;
    const { positionX: powerUpX, positionY: powerUpY } = this;

    // Calculate distance to player
    const distanceX = playerX - powerUpX;
    const distanceY = playerY - powerUpY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Check if the player is within the shooting range
    return distance - Map.offsetX <= this.AnimationRange;
  }
}

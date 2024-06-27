import { platformValues } from "../constants/platformValues.ts";
import { CANVAS } from "../constants/constant.ts";
import { collisionDetections } from "../utils/collisionDetection.ts";

interface ICharacter {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isInGrounded: boolean;
}

export class Character implements ICharacter {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isInGrounded: boolean;

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isInGrounded = true;
  }

  /**
   * The gravity function updates the position of an object based on its vertical velocity, simulating a
   * gravitational effect.
   */
  gravity(): void {
    if (this.positionY + this.height + this.velocityY < CANVAS.HEIGHT) {
      this.positionY += this.velocityY;
      this.velocityY += 0.5;
    } else {
      this.velocityY = 0; // Reset velocity to zero when on the ground
    }
  }

  /**
   * The function `checkVerticalCollision` checks for collisions with platforms and adjusts the player's
   * position and velocity accordingly.
   */
  checkVerticalCollision(): void {
    platformValues.forEach((platform: any) => {
      if (collisionDetections(this, platform)) {
        if (this.velocityY > 0) {
          this.velocityY = 0;
          if (this.positionY + this.height >= platform.y) {
            this.positionY = platform.y - 50;
          }
        }
      }
    });
  }
}

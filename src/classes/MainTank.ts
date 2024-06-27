import { PLAYER, TANK } from "../constants/constant";
import { Character } from "./Character";

import tankImage from "../assets/images/Contra-Tanks.gif";
import tankBulletImage from "../assets/images/goldBall.png";
import { collisionBetweenCharacters } from "../utils/collisionDetection";
import { Bullet } from "./Bullet";
import Map from "./Map";
import Player from "./Player";
import { sprite, tankSprites } from "../spriteCoordinates/EnemySpriteCords";
import { player } from "../main";

export const mainTanks: MainTank[] = [];
interface IMainTank {
  positionX: number;
  positionY: number;
}

export class MainTank extends Character implements IMainTank {
  positionX: number;
  positionY: number;
  tankImage: HTMLImageElement;
  tankBUlletImage: HTMLImageElement;
  health: number;

  isPlayerLeft: boolean;
  isPlayerRight: boolean;
  isPlayerAbove: boolean;
  isPlayerBelow: boolean;

  bullets: Bullet[] = [];
  tankAction: sprite;

  lastShotTime: number;
  shotCooldown: number;
  shootingRange: number;

  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, TANK.WIDTH, TANK.HEIGHT);
    this.positionX = positionX;
    this.positionY = positionY;
    this.isPlayerLeft = false;
    this.isPlayerRight = false;
    this.isPlayerAbove = false;
    this.isPlayerBelow = false;
    this.health = 3;

    this.tankImage = new Image();
    this.tankImage.src = tankImage;
    this.tankBUlletImage = new Image();
    this.tankBUlletImage.src = tankBulletImage;

    this.tankAction = tankSprites.new[2];

    this.lastShotTime = 0;
    this.shotCooldown = 1000; // Set cooldown period in milliseconds
    this.shootingRange = 800; // Set the shooting range in pixels
  }
  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.tankAction;
    ctx.drawImage(
      this.tankImage,
      x,
      y,
      width,
      height,
      this.positionX - Map.offsetX,
      this.positionY,
      this.width,
      this.height
    );
    // Draw bullets
    this.bullets.forEach((bullet) => bullet.draw(ctx, this.tankBUlletImage));
  }
  update(player: Player) {
    this.getPlayerDirection(player);

    // Attempt to shoot at player
    this.shootAtPlayer(player);

    // Update bullets
    this.bullets.forEach((bullet, index) => {
      bullet.moveBullet(this.bullets);
      if (collisionBetweenCharacters(bullet, player)) {
        this.handleBulletCollision(this.bullets, index);
      }
    });
  }

  handleBulletCollision(bullets: Bullet[], bulletIndex: number): void {
    player.playerHit();
    bullets.splice(bulletIndex, 1);
  }

  getPlayerDirection(player: Player) {
    const { positionX: playerX, positionY: playerY } = player;
    const { positionX: enemyX, positionY: enemyY } = this;

    this.isPlayerLeft = playerX + PLAYER.WIDTH + Map.offsetX < enemyX;

    this.isPlayerRight = playerX + Map.offsetX > enemyX + PLAYER.WIDTH;

    this.isPlayerBelow = playerY > enemyY + PLAYER.HEIGHT;

    this.isPlayerAbove = playerY < enemyY - PLAYER.HEIGHT;

    return this.changeTankSprite();
  }
  changeTankSprite() {
    if (this.isPlayerLeft && this.isPlayerAbove) {
      this.tankAction = this.tankAction;
      return "DIRECTION_UP_LEFT";
    } else if (this.isPlayerRight && this.isPlayerAbove) {
      this.tankAction = this.tankAction;
      return "DIRECTION_UP_RIGHT";
    } else if (this.isPlayerRight && this.isPlayerBelow) {
      this.tankAction = this.tankAction;
      return "DIRECTION_DOWN_RIGHT";
    } else if (this.isPlayerLeft && this.isPlayerBelow) {
      this.tankAction = this.tankAction;
      return "DIRECTION_DOWN_LEFT";
    } else if (this.isPlayerLeft) {
      this.tankAction = this.tankAction;
      return "DIRECTION_LEFT";
    } else if (this.isPlayerRight) {
      this.tankAction = this.tankAction;
      return "DIRECTION_RIGHT";
    } else if (this.isPlayerBelow) {
      this.tankAction = this.tankAction;
      return "DIRECTION_DOWN";
    } else if (this.isPlayerAbove) {
      this.tankAction = this.tankAction;
      return "DIRECTION_UP";
    }
  }
  isPlayerInRange(player: Player): boolean {
    let { positionX: playerX, positionY: playerY } = player;
    const { positionX: enemyX, positionY: enemyY } = this;

    // Calculate distance to player
    const distanceX = playerX - enemyX;
    const distanceY = playerY - enemyY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Check if the player is within the shooting range
    return distance - Map.offsetX <= this.shootingRange;
  }

  shootAtPlayer(player: Player) {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime < this.shotCooldown) {
      return; // If the cooldown period has not passed, do not shoot
    }

    if (!this.isPlayerInRange(player)) {
      return; // If the player is not within range, do not shoot
    }

    const { positionX: enemyX, positionY: enemyY } = this;

    let direction = this.getPlayerDirection(player);

    // Create and add bullet
    const bullet = new Bullet(enemyX - Map.offsetX, enemyY, direction, true);
    this.bullets.push(bullet);

    // Update the last shot time
    this.lastShotTime = currentTime;
  }
}

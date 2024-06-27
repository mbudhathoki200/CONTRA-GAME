import bulletImgL from "../assets/images/leftBullet.png";
import bulletImgR from "../assets/images/rightBullet.png";
import {
  collisionBetweenCharacters,
  collisionBetweenWithGuardBullet,
} from "../utils/collisionDetection.ts";

import { BULLET_SPRITE, CANVAS, PLAYER, SCORE } from "../constants/constant.ts";
import { enemyHitSound, metalHitSound } from "../utils/gameAudio.ts";
import { Explosion, explosionArray } from "./Explosion.ts";
import { powerUP, powerUpArray } from "./powerUp.ts";

import { RunningEnemy } from "./RunningEnemy.ts";
import { GuardEnemy } from "./GuardEnemy.ts";
import { MainTank } from "./MainTank.ts";
import { Tank } from "./Tank.ts";
import { PowerUpBox } from "./PowerUpBox.ts";
import { BULLET } from "../constants/constant.ts";
import { player } from "../main.ts";

interface IBullet {
  positionX: number;
  positionY: number;
}
export class Bullet implements IBullet {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  bulletImg: HTMLImageElement;
  isBulletFast: boolean;

  direction: string | undefined;

  constructor(
    positionX: number,
    positionY: number,
    direction: string | undefined,
    isBulletFast: boolean = true
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.bulletImg = new Image();
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.direction = direction;
    this.bulletImg.src =
      direction === "DIRECTION_RIGHT" ? bulletImgR : bulletImgL;
    this.isBulletFast = isBulletFast;
  }
  draw(
    ctx: CanvasRenderingContext2D,
    bulletImg: HTMLImageElement = this.bulletImg,
    WIDTH: number = this.width,
    HEIGHT: number = this.height
  ) {
    bulletImg = bulletImg;
    ctx.drawImage(bulletImg, this.positionX, this.positionY, WIDTH, HEIGHT);
  }

  //To move the bullets
  moveBullet(bullets: Bullet[]) {
    switch (this.direction) {
      case "DIRECTION_RIGHT":
        if (this.isBulletFast) {
          this.positionX += BULLET.SPEED;
        } else {
          this.positionX += BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_LEFT":
        if (this.isBulletFast) {
          this.positionX -= BULLET.SPEED;
        } else {
          this.positionX -= BULLET.SLOW_SPEED;
        }

        break;
      case "DIRECTION_UP":
        if (this.isBulletFast) {
          this.positionY -= BULLET.SPEED;
        } else {
          this.positionY -= BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_DOWN_RIGHT":
        if (this.isBulletFast) {
          this.positionX += BULLET.SPEED;
          this.positionY += BULLET.SPEED;
        } else {
          this.positionX += BULLET.SLOW_SPEED;
          this.positionY += BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_DOWN_LEFT":
        if (this.isBulletFast) {
          this.positionX -= BULLET.SPEED;
          this.positionY += BULLET.SPEED;
        } else {
          this.positionX -= BULLET.SLOW_SPEED;
          this.positionY += BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_UP_RIGHT":
        if (this.isBulletFast) {
          this.positionX += BULLET.SPEED;
          this.positionY -= BULLET.SPEED;
        } else {
          this.positionX += BULLET.SLOW_SPEED;
          this.positionY -= BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_UP_LEFT":
        if (this.isBulletFast) {
          this.positionX -= BULLET.SPEED;
          this.positionY -= BULLET.SPEED;
        } else {
          this.positionX -= BULLET.SLOW_SPEED;
          this.positionY -= BULLET.SLOW_SPEED;
        }
        break;
    }
    if (
      this.positionX < 0 ||
      this.positionX > CANVAS.WIDTH ||
      this.positionY < 0 ||
      this.positionY > CANVAS.HEIGHT
    ) {
      this.removeBullet(bullets);
    }
  }
  removeBullet(bullets: Bullet[]) {
    const index = bullets.indexOf(this);
    if (index > -1) {
      bullets.splice(index, 1);
    }
  }

  /**
   * The function checks for collisions between the bullet and running enemies, and handles the
   * collisions accordingly.
   * @param {RunningEnemy[]} enemies - An array of RunningEnemy objects representing the enemies in the
   * game.
   * @param {Bullet[]} bullets - The `bullets` parameter in the `checkCollisionsWithEnemies` function is
   * an array of `Bullet` objects. This array contains the bullets that are fired and used to check for
   * collisions with enemies.
   */
  checkCollisionsWithEnemies(enemies: RunningEnemy[], bullets: Bullet[]): void {
    enemies.forEach((enemy, enemyIndex) => {
      if (collisionBetweenCharacters(this, enemy)) {
        this.handleCollisionWithEnemy(enemies, bullets, enemyIndex);
      }
    });
  }

  /**
   * The function checks for collisions between the player bullet and static enemies and handles the collisions
   * accordingly.
   * @param {GuardEnemy[] | Tank[] | MainTank[]} enemies - The `enemies` parameter in the
   * `checkCollisionsWithStaticEnemies` function can be of type `GuardEnemy[]`, `Tank[]`, or
   * `MainTank[]`. It represents an array of enemy objects that the player needs to check for collisions
   * with.
   * @param {Bullet[]} bullets - The `bullets` parameter is an array of objects representing bullets
   * fired in the game.
   */
  checkCollisionsWithStaticEnemies(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    bullets: Bullet[]
  ): void {
    enemies.forEach((enemy, enemyIndex) => {
      if (collisionBetweenWithGuardBullet(this, enemy)) {
        this.handleCollisionWithGuardEnemy(enemies, bullets, enemyIndex, enemy);
      }
    });
  }

  /**
   * The function `checkCollisionsWithpowerUp` iterates through power-up boxes and handles collisions
   * with the player's  bullets.
   * @param {PowerUpBox[]} powerUps - PowerUpBox[] - an array of power-up boxes on the game screen
   * @param {Bullet[]} bullets - The `bullets` parameter in the `checkCollisionsWithpowerUp` method is an
   * array of `Bullet` objects. This array contains the bullets that are currently active and moving
   * within the game environment. The method iterates over this array to check for collisions between the
   * player character (represented by
   */
  checkCollisionsWithpowerUp(powerUps: PowerUpBox[], bullets: Bullet[]): void {
    powerUps.forEach((powerUp, enemyIndex) => {
      if (collisionBetweenWithGuardBullet(this, powerUp)) {
        this.handleCollisionWithPowerUp(powerUps, bullets, enemyIndex);
      }
    });
  }

  /**
   * This function handles collisions between the player bullet and various types of enemies, updating the
   * player's score, playing a sound effect, creating an explosion effect, and removing the enemy and
   * bullet from their respective arrays.
   * @param {RunningEnemy[] | GuardEnemy[] | Tank[] | MainTank[] | PowerUpBox[]} enemies - The `enemies`
   * parameter is an array that can contain objects of type `RunningEnemy`, `GuardEnemy`, `Tank`,
   * `MainTank`, or `PowerUpBox`.
   * @param {Bullet[]} bullets - The `bullets` parameter is an array of objects representing bullets
   * fired in the game.
   * @param {number} enemyIndex - The `enemyIndex` parameter is the index of the enemy that the player
   * has collided with in the `enemies` array. This index is used to identify the specific enemy that the
   * player has collided with so that it can be removed from the array after the collision.
   */
  handleCollisionWithEnemy(
    enemies: RunningEnemy[] | GuardEnemy[] | Tank[] | MainTank[] | PowerUpBox[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    //Increase Score
    PLAYER.SCORE += SCORE.RUNNING_ENEMY;
    enemyHitSound();
    //Explosion Push
    explosionArray.push(new Explosion(this.positionX, this.positionY));
    //remove enemy from array
    enemies.splice(enemyIndex, 1);
    // Remove bullet from array
    this.removeBullet(bullets);
  }

  //Handle Player Bullet Hit Guard Enemy

  handleCollisionWithGuardEnemy(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    bullets: Bullet[],
    enemyIndex: number,
    enemy: GuardEnemy | Tank
  ): void {
    this.removeBullet(bullets);
    enemy.health--;

    if (enemy.health == 0) {
      PLAYER.SCORE += SCORE.GUARD_ENEMY;
      this.handleAfterEnemyHit(enemies, enemyIndex);
    }
  }

  /**
   * This function handles collisions between player bullets and tank enemies, updating the player's
   * score and removing the bullet from the array.
   * @param {GuardEnemy[] | Tank[] | MainTank[]} enemies - The `enemies` parameter is an array that can
   * contain instances of `GuardEnemy`, `Tank`, or `MainTank` objects.
   * @param {Bullet[]} bullets - The `bullets` parameter is an array of objects representing bullets
   * fired in the game.
   * @param {number} enemyIndex - The `enemyIndex` parameter is the index of the enemy that the collision
   * occurred with in the `enemies` array.
   */
  handleCollisionWithTankEnemy(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    // Remove bullet from array
    this.removeBullet(bullets);

    PLAYER.SCORE += SCORE.TANK;
    this.handleAfterEnemyHit(enemies, enemyIndex);
  }

  /**
   * The function `handleCollisionWithPowerUp` handles collisions between the player's bullet and power-ups,
   * triggering a sound effect, spawning a new power-up, and removing the collided power-up and bullets
   * from their respective arrays.
   * @param {PowerUpBox[]} powerUp - The `powerUp` parameter is an array of `PowerUpBox` objects
   * representing power-up boxes in the game.
   * @param {Bullet[]} bullets - The `bullets` parameter is an array of Bullet objects.
   * @param {number} enemyIndex - The `enemyIndex` parameter in the `handleCollisionWithPowerUp` function
   * represents the index of the enemy in the `powerUp` array that has collided with the player. This
   * index is used to remove the specific enemy from the array after the collision has occurred.
   */
  handleCollisionWithPowerUp(
    powerUp: PowerUpBox[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    metalHitSound();
    //push power UP
    powerUpArray.push(new powerUP(player.positionX + 200, player.positionY));

    //remove enemy from array
    powerUp.splice(enemyIndex, 1);
    // Remove bullet from array
    this.removeBullet(bullets);
  }

  /**
   * The function `handleAfterEnemyHit` plays a sound, creates an explosion, and removes an enemy from an
   * array based on the enemy index.
   * @param {GuardEnemy[] | Tank[] | MainTank[]} enemies - The `enemies` parameter is an array that can
   * contain instances of `GuardEnemy`, `Tank`, or `MainTank` objects.
   * @param {number} enemyIndex - The `enemyIndex` parameter is the index of the enemy that was hit and
   * needs to be removed from the `enemies` array.
   */
  handleAfterEnemyHit(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    enemyIndex: number
  ) {
    enemyHitSound();
    //explosion
    explosionArray.push(new Explosion(this.positionX, this.positionY));
    //remove enemy from array
    enemies.splice(enemyIndex, 1);
  }
}

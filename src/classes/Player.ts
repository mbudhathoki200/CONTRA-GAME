import playerSheet from "../assets/images/player.gif";
import { CANVAS, PLAYER } from "../constants/constant.ts";
import { animationFrame } from "../main.ts";
import {
  TargetUpLR,
  playerPronePosition,
  playerTargetDown,
  playerTargetUp,
  runningLeft,
  runningRight,
  sprite,
} from "../spriteCoordinates/PlayerSpriteCords.ts";
import {
  collisionBetweenCharacters,
  collisionWithPowerUp,
} from "../utils/collisionDetection.ts";
import displayGameOver from "../utils/displayGameOverScreen.ts";
import { playerHitSound } from "../utils/gameAudio.ts";
import { input } from "../utils/input.ts";
import { Bullet } from "./Bullet.ts";
import { Character } from "./Character.ts";
import { GuardEnemy } from "./GuardEnemy.ts";
import { MainTank } from "./MainTank.ts";
import Map from "./Map.ts";
import { PowerUpBox } from "./PowerUpBox.ts";
import { RunningEnemy } from "./RunningEnemy.ts";
import { Tank } from "./Tank.ts";
import { powerUP, powerUpArray } from "./powerUp.ts";

interface IPlayer {
  // positionX: number;
  // positionY: number;
}
//Bullet Array
const bullets: Bullet[] = [];

let bullet;

export default class Player extends Character implements IPlayer {
  playerImage: HTMLImageElement;
  velocityX: number;
  velocityY: number;
  SPEED: number;
  life: number;

  isInGrounded: boolean;
  inWater: boolean;
  isJumping: boolean;
  isRunning: boolean;
  isProne: boolean;

  runReq: number;
  animationTimer: number;
  animationCounter: number;
  playerDirection: string;
  playerAction: sprite;

  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, PLAYER.WIDTH, PLAYER.HEIGHT);
    this.velocityX = 0;
    this.velocityY = 0;
    this.SPEED = PLAYER.SPEED;
    this.life = PLAYER.LIFE;

    this.isJumping = false;
    this.isRunning = false;
    this.isInGrounded = false;
    this.inWater = false;
    this.isProne = false;

    this.playerImage = new Image();
    this.playerImage.src = playerSheet;
    this.runReq = 0;
    this.animationTimer = 0;
    this.animationCounter = 0;
    this.playerDirection = "DIRECTION_RIGHT";
    this.playerAction = runningRight[0];
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.playerImage,
      this.playerAction.x,
      this.playerAction.y,
      this.playerAction.width,
      this.playerAction.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }

  update(
    ctx: CanvasRenderingContext2D,
    enemies: RunningEnemy[],
    guardEnemies: GuardEnemy[],
    tanks: Tank[],
    mainTanks: MainTank[],
    powerUpBlocks: PowerUpBox[]
  ): void {
    if (!this.isInGrounded) {
      this.gravity(); //For Gravity Effect
    }

    this.checkVerticalCollision();

    if (input.down) {
      this.stopMoving();
      this.playerProne();
    }

    if (input.jump) {
      this.jump();
    }

    if (input.bullet && !input.isShooting) {
      input.isShooting = true;
      // bullet instantiate
      let bulletDirection = this.playerDirection;

      if (input.up) {
        bulletDirection = "DIRECTION_UP";
        bullet = new Bullet(
          this.positionX + PLAYER.WIDTH / 2,
          this.positionY + PLAYER.HEIGHT / 3,
          bulletDirection,
          true
        );
      }
      if (input.down && input.right) {
        bulletDirection = "DIRECTION_DOWN_RIGHT";
      } else if (input.down && input.left) {
        bulletDirection = "DIRECTION_DOWN_LEFT";
      } else if (input.down && input.right) {
        bulletDirection = "DIRECTION_UP_RIGHT";
      } else if (input.up && input.right) {
        bulletDirection = "DIRECTION_UP_RIGHT";
      } else if (input.up && input.left) {
        bulletDirection = "DIRECTION_UP_LEFT";
      }

      bullet = new Bullet(
        this.positionX + PLAYER.WIDTH,
        this.positionY + PLAYER.HEIGHT / 3,
        bulletDirection,
        true
      );
      bullets.push(bullet);
    }

    if (!this.inWater) {
      if (input.up) {
        this.stopMoving();
        this.targetUp(this.playerDirection);
      }
      if (input.down && input.right) {
        this.stopMoving();
        this.targetDown("DIRECTION_DOWN_RIGHT");
      }
      if (input.down && input.left) {
        this.stopMoving();
        this.targetDown("DIRECTION_DOWN_LEFT");
      }
      if (input.up && input.right) {
        this.stopMoving();
        this.targetUpLR("DIRECTION_DOWN_RIGHT");
      }
      if (input.up && input.left) {
        this.stopMoving();
        this.targetUpLR("DIRECTION_DOWN_LEFT");
      }
    }

    bullets.forEach((bullet) => {
      bullet.moveBullet(bullets);
      bullet.draw(ctx);
      //For Running Enemy
      bullet.checkCollisionsWithEnemies(enemies, bullets);
      //For Guard Enemy
      bullet.checkCollisionsWithStaticEnemies(guardEnemies, bullets);
      //For Tank
      bullet.checkCollisionsWithStaticEnemies(tanks, bullets);
      //For Main Tank
      bullet.checkCollisionsWithStaticEnemies(mainTanks, bullets);
      //For PowerUP Block
      bullet.checkCollisionsWithpowerUp(powerUpBlocks, bullets);
    });

    //Reset if No input Stroke is pressed
    if (Object.values(input).every((value) => value === false)) {
      this.animationTimer = 0;
      this.animationCounter = 0;
      this.stopMoving();
      this.resetActions();
      this.resetPlayerSize();
    }
    // Check for collisions with enemies
    this.checkCollisionsWithEnemies(enemies);

    //chech collision with powerUps
    this.checkCollisionsWithPowerUp(powerUpArray);
  }

  /**
   * The `moveLeft` function in TypeScript moves the player character to the left on the game map while
   * also adjusting the camera position if needed.
   * @param {Map} gameMap - The `gameMap` parameter is an object representing the game map in the code
   * snippet provided. It is used to interact with and manipulate the game map, such as moving the map
   * left based on the player's movement in the game.
   */
  moveLeft(gameMap: Map): void {
    if (this.positionX > 0) {
      this.animateMovement();

      this.playerDirection = "DIRECTION_LEFT";

      if (!input.jump) {
        this.playerRunning(this.playerDirection);
      }
      this.velocityX = this.SPEED;
      this.positionX -= this.velocityX;

      //move camera
      if (this.positionX > CANVAS.WIDTH / 2) {
        gameMap.moveLeft(this.SPEED);
        Map.offsetX -= this.SPEED;
      }
    }
  }

  /**
   * The `moveRight` function in TypeScript updates the player's position and camera offset to move the
   * player to the right within the game map boundaries.
   * @param {Map} gameMap - The `gameMap` parameter in the `moveRight` function represents the map or
   * level that the player character is currently on. It is an object that likely contains information
   * about the layout of the game world, such as platforms, obstacles, and other elements that the player
   * can interact with or move across
   */

  moveRight(gameMap: Map): void {
    this.animateMovement();
    this.playerDirection = "DIRECTION_RIGHT";
    if (!input.jump) {
      this.playerRunning(this.playerDirection);
    }
    if (this.positionX + this.width < CANVAS.WIDTH / 2) {
      this.velocityX = this.SPEED;
      this.positionX += this.velocityX;
    }

    //For Camera Offset
    if (this.positionX + this.width > CANVAS.WIDTH / 2) {
      gameMap.moveRight(this.SPEED);
      Map.offsetX += this.SPEED;
    }
    if (this.positionX > 3475) {
      this.positionX = 3475;
      this.velocityX = 0;
    }
  }

  resetPlayerSize(): void {
    this.height = PLAYER.HEIGHT;
    this.width = PLAYER.WIDTH;
  }

  /**
   * The playerProne function adjusts the player's position and appearance when they are in a prone
   * state.
   */
  playerProne(): void {
    const { left, right } = playerPronePosition;

    this.width = PLAYER.WIDTH + 20;
    this.height = PLAYER.HEIGHT - 22;

    if (this.playerDirection == "DIRECTION_LEFT") {
      this.playerAction = left;
    } else {
      this.playerAction = right;
    }
    this.isProne = true;
  }

  jump(): void {
    this.isJumping = true;
    this.isInGrounded = false;
    this.velocityY = -PLAYER.JUMP_POWER;
  }

  //Sprite change of player
  targetUp(direction: string) {
    if (direction === "DIRECTION_LEFT") {
      this.playerAction = playerTargetUp.left;
    } else {
      this.playerAction = playerTargetUp.right;
    }
  }
  targetUpLR(direction: string) {
    let { left, right } = TargetUpLR;
    if (direction == "DIRECTION_DOWN_RIGHT") {
      this.playerAction = right;
    } else {
      this.playerAction = left;
    }
    this.height = PLAYER.HEIGHT;
    this.width = PLAYER.WIDTH;
  }

  targetDown(direction: string) {
    let { left, right } = playerTargetDown;
    if (direction == "DIRECTION_DOWN_RIGHT") {
      this.playerAction = right;
    } else {
      this.playerAction = left;
    }
    this.height = PLAYER.HEIGHT;
    this.width = PLAYER.WIDTH;
  }

  /**
   * The function `playerRunning` sets the player's action based on the direction provided.
   * @param {string} direction - The `direction` parameter in the `playerRunning` function is a string
   * that specifies the direction in which the player is running. It is used to determine whether the
   * player should be running to the right or to the left.
   */
  playerRunning(direction: string) {
    const runningDirection =
      direction === "DIRECTION_RIGHT" ? runningRight : runningLeft;

    const lastIndex = runningDirection.length - 1;

    if (this.animationTimer >= lastIndex) {
      this.animationTimer = 1;
    }
    this.playerAction = runningDirection[this.animationTimer];
  }

  /**
   * The `animateMovement` function increments the `animationCounter` and updates the `animationTimer`
   * based on certain conditions.
   */
  animateMovement() {
    this.animationCounter++;
    if (this.animationCounter % 7 == 0 && this.animationCounter != 0) {
      this.animationTimer += 1;
    }
  }
  stopMoving() {
    this.velocityX = 0;
  }

  resetActions() {
    if (this.playerDirection == "DIRECTION_LEFT") {
      this.playerAction = runningLeft[0];
    } else {
      this.playerAction = runningRight[0];
    }
  }

  //check collision with Running enemies
  checkCollisionsWithEnemies(enemies: RunningEnemy[]): void {
    enemies.forEach((enemy, index) => {
      if (collisionBetweenCharacters(this, enemy)) {
        this.handleCollisionWithEnemy(enemies, index);
      }
    });
  }
  //collision with powerUps
  checkCollisionsWithPowerUp(powerUpArray: powerUP[]): void {
    powerUpArray.forEach((power, index) => {
      if (collisionWithPowerUp(this, power)) {
        this.handleCollisionWithPowerUP(powerUpArray, index);
      }
    });
  }

  handleCollisionWithEnemy(enemies: RunningEnemy[], enemyIndex: number): void {
    this.playerHit();
    // Remove the enemy from the array
    enemies.splice(enemyIndex, 1);
  }

  handleCollisionWithPowerUP(power: powerUP[], powerIndex: number): void {
    PLAYER.LIFE += 1; // Increase player life
    power.splice(powerIndex, 1);
  }

  /**
   * The `reSpawn` function checks the player's life and either displays game over or respawns the player
   * at a specific position.
   */
  reSpawn(): void {
    if (PLAYER.LIFE <= 1) {
      displayGameOver();
      cancelAnimationFrame(animationFrame);
    } else {
      this.positionX = PLAYER.RESPAWN_POSITION_X;
      this.positionY = PLAYER.RESPAWN_POSITION_Y;
    }
  }
  playerHit() {
    // this.reSpawn();
    playerHitSound();
    PLAYER.LIFE -= 1; // Decrease player life
  }
}

import enemySprite from "../assets/images/Enemies.gif";
import { ENEMY } from "../constants/constant";
import { Character } from "./Character";
import { runningEnemy, sprite } from "../spriteCoordinates/EnemySpriteCords";

export const runningEnemies: RunningEnemy[] = [];
interface IEnemy {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export class RunningEnemy extends Character implements IEnemy {
  positionX: number;
  positionY: number;
  isInGrounded: boolean;
  animationCounter: number;
  animationTimer: number;
  lastUpdateTime: number;
  enemyImage: HTMLImageElement;
  enemyDirection: string;
  enemyAction: sprite;
  health: number;

  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, ENEMY.WIDTH, ENEMY.HEIGHT);
    this.positionX = positionX;
    this.positionY = positionY;
    this.isInGrounded = false;
    this.animationCounter = 0;
    this.animationTimer = 0;
    this.lastUpdateTime = Date.now();
    this.enemyImage = new Image();
    this.enemyImage.src = enemySprite;
    this.enemyDirection = "DIRECTION_LEFT";
    this.enemyAction = runningEnemy.runningLeft[0];
    this.health = 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.enemyImage,
      this.enemyAction.x,
      this.enemyAction.y,
      this.enemyAction.width,
      this.enemyAction.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }

  update(): void {
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastUpdateTime;
    this.lastUpdateTime = currentTime;

    if (!this.isInGrounded) {
      this.gravity(); // For Gravity Effect
    }
    this.checkVerticalCollision();
    this.positionX -= ENEMY.SPEED;

    // Update animation
    this.updateAnimation(deltaTime);
  }

  /**
   * The function updates the animation of a running enemy based on the elapsed time.
   * @param {number} deltaTime - Delta time is the time elapsed since the last frame update, typically
   * measured in milliseconds. It is used to ensure smooth and consistent animation by adjusting the
   * movement or changes in the game objects based on the time passed.
   */
  updateAnimation(deltaTime: number): void {
    this.animationTimer += deltaTime;
    const FRAME_DURATION = 100; // Duration for each frame in milliseconds

    while (this.animationTimer >= FRAME_DURATION) {
      this.animationTimer -= FRAME_DURATION;
      this.animationCounter =
        (this.animationCounter + 1) % runningEnemy.runningLeft.length;
      this.enemyAction = runningEnemy.runningLeft[this.animationCounter];
    }
  }
}

import { powerUpBoxs } from "./constants/powerUpBlocksPositions";
import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map.ts";
import Player from "./classes/Player.ts";

import { platformValues } from "./constants/platformValues.ts";
import { explosionArray } from "./classes/Explosion.ts";
import { GuardEnemy, guardEnemies } from "./classes/GuardEnemy.ts";
import { MainTank, mainTanks } from "./classes/MainTank.ts";
import { Platfrom } from "./classes/Platform.ts";
import { PowerUpBox, powerUpBlocks } from "./classes/PowerUpBox.ts";
import { RunningEnemy, runningEnemies } from "./classes/RunningEnemy.ts";
import { Tank, tanks } from "./classes/Tank.ts";
import { powerUpArray } from "./classes/powerUp.ts";
import { gameScreen, startBtn, startScreen } from "./elements.ts";

// Constants and Utilities
import { CANVAS } from "./constants/constant.ts";
import {
  guardEnemy,
  mainTank,
  runningEnemy,
  tank,
} from "./constants/enemyPositions.ts";
import {
  displayPlayerLife,
  displayPlayerScore,
} from "./utils/displayParameters.ts";
import { playerGunSound } from "./utils/gameAudio.ts";
import { input } from "./utils/input.ts";

export let player: Player;
export let animationFrame: number;

function init() {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  canvas.height = CANVAS.HEIGHT;
  canvas.width = CANVAS.WIDTH;

  // Instantiate game elements
  const gameMap = new Map(0, 0);

  player = new Player(40, 100);

  //Guard Enemy
  guardEnemy.forEach((enemy) => {
    const newGuardEnemy = new GuardEnemy(
      enemy.positionX,
      enemy.positionY,
      enemy.isBulletFast
    );
    guardEnemies.push(newGuardEnemy);
  });

  //Running Enemy
  runningEnemy.forEach((enemy) => {
    const newRunningEnemy = new RunningEnemy(enemy.positionX, enemy.positionY);
    runningEnemies.push(newRunningEnemy);
  });

  //Tank
  tank.forEach((tank) => {
    const newTankEnemy = new Tank(tank.positionX, tank.positionY);
    tanks.push(newTankEnemy);
  });

  //Big Tank
  mainTank.forEach((tank) => {
    const newTankEnemy = new MainTank(tank.positionX, tank.positionY);
    mainTanks.push(newTankEnemy);
  });

  //powerUps
  powerUpBoxs.forEach((powerup) => {
    const newTankEnemy = new PowerUpBox(powerup.positionX, powerup.positionY);
    powerUpBlocks.push(newTankEnemy);
  });

  // Function to draw game elements
  function draw() {
    ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

    //map Render
    gameMap.draw(ctx);

    //score Display
    displayPlayerScore(ctx);

    //Display Life
    displayPlayerLife(ctx);

    //update player with platform Collision Detection
    player.draw(ctx);
    player.update(
      ctx,
      runningEnemies,
      guardEnemies,
      tanks,
      mainTanks,
      powerUpBlocks
    );

    //Render Enemy
    runningEnemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update();
    });

    //Draw platforms
    platformValues.forEach((platform) => {
      new Platfrom(platform.x, platform.y, platform.w, platform.h, platform.id);
    });

    //Render Guard Enemy
    guardEnemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(player);
    });

    //Render PowerUps
    powerUpArray.forEach((powerup) => {
      powerup.draw(ctx);
    });

    //Render Tanks
    tanks.forEach((tank) => {
      tank.draw(ctx);
      tank.update(player);
    });

    // Render Main Tans
    mainTanks.forEach((tank) => {
      tank.draw(ctx);
      tank.update(player);
    });
    //render PowerUps
    powerUpBlocks.forEach((block) => {
      block.draw(ctx);
      block.update(player);
    });

    //render Explosions
    explosionArray.forEach((explosion) => {
      explosion.draw(ctx);
      explosion.update();
      if (explosion.removeExplosion) {
        explosionArray.splice(explosionArray.indexOf(explosion), 1);
      }
    });

    animationFrame = requestAnimationFrame(draw);
  }

  draw();

  // Event listeners for keyboard input
  window.onkeydown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        input.left = true;
        player.moveLeft(gameMap);
        break;
      case "ArrowRight":
        input.right = true;
        player.moveRight(gameMap);
        break;
      case "ArrowDown":
        input.down = true;
        break;
      case "ArrowUp":
        input.up = true;
        break;
      case "x":
        input.jump = true;
        break;
      case "z":
        input.bullet = true;
        playerGunSound();
        break;
    }
  };

  window.onkeyup = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        input.left = false;
        break;
      case "ArrowRight":
        input.right = false;
        break;
      case "ArrowDown":
        input.down = false;
        break;
      case "ArrowUp":
        input.up = false;
        break;
      case "x":
        input.jump = false;
        break;
      case "z":
        input.bullet = false;
        input.isShooting = false;
        break;
    }
  };
}

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "flex";
  init();
});

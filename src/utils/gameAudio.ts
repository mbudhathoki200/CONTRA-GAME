const gameAudios = {
  title: "./assets/sound/title.mp3",
  menuSelect: "./assets/sound/menu-selection.mp3",
  menuHover: "./assets/sound/menu-button.mp3",
  gameOver: "./assets/sound/game-over.mp3",
  gameMusic: "./assets/sound/Contra-Jungle.mp3",
  gameOverMusic: "./assets/sound/game-over.mp3",

  playerGun: "../assets/sounds/enemy-gun.mp3",

  collectPowerup: "./assets/sound/8-bit-powerup-6768.mp3",
  explosion: "./assets/sound/explosion-91872.mp3",
  cannonHit: "./assets/sound/cannonball-89596.mp3",
  powerDown: "./assets/sound/power-down-7103.mp3",
  shutDown: "./assets/sound/discharged-battery-151926.mp3",
  specialBullet: "./assets/sound/plasmacannon-94545.mp3",
  enemyShooting: "./assets/sound/desert-eagle-gunshot-14622.mp3",
  turretShooting: "./assets/sound/laser-zap-90575.mp3",
};
import playerGun from "../assets/sounds/enemy-gun.mp3";
import playerHit from "../assets/sounds/dead.mp3";
import enemyHit from "../assets/sounds/enemy-hit.mp3";
import metalHit from "../assets/sounds/explosion_asteroid-101886.mp3";

function playAudio(soundPath: string) {
  const audio = new Audio(soundPath);
  audio.play();
}

export function playerHitSound() {
  playAudio(playerHit);
}

export function enemyHitSound() {
  playAudio(enemyHit);
}

export function explosionSound() {
  playAudio(gameAudios.explosion);
}

export function metalHitSound() {
  playAudio(metalHit);
}

export function playerGunSound() {
  playAudio(playerGun);
}
//rxport const amusic = new audio()
//

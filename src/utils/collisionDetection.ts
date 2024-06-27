import { Bullet } from "../classes/Bullet";
import Map from "../classes/Map";
import { Platfrom } from "../classes/Platform";
import { PowerUpBox } from "../classes/PowerUpBox";
import { powerUP } from "../classes/powerUp";
import { Character } from "../classes/Character";

/**
 * The function `collisionDetections` checks for collision between a character and a platform in a
 * TypeScript environment.
 * @param {Character} character - The `character` parameter represents the character in the game, and
 * it contains information such as its position (positionX, positionY), width, and height.
 * @param {Platfrom} platform - The `platform` parameter seems to represent an object with properties
 * `x`, `y`, `w`, and `h`, which  define the position and dimensions of a platform in a game or
 * application. The `x` and `y` properties  represent the coordinates of the top-left corner of
 * @returns The function `collisionDetections` is returning a boolean value, which indicates whether
 * the character is colliding with the platform based on the specified conditions.
 */
export const collisionDetections = (
  character: Character,
  platform: Platfrom
): boolean => {
  return (
    character.positionX < platform.x - Map.offsetX + platform.w &&
    character.positionX + character.width > platform.x - Map.offsetX &&
    character.positionY + 50 <= platform.y + platform.h &&
    character.positionY + character.height > platform.y
  );
};

export const collisionBetweenCharacters = (
  object1: Character | Bullet,
  object2: Character | powerUP
) => {
  return (
    object1.positionX < object2.positionX + object2.width &&
    object1.positionX + object1.width > object2.positionX &&
    object1.positionY < object2.positionY + object2.height &&
    object1.positionY + object1.height > object2.positionY
  );
};
// collision between character and powerup
export const collisionWithPowerUp = (object1: Character, object2: powerUP) => {
  return (
    object1.positionX < object2.positionX - Map.offsetX + object2.width &&
    object1.positionX + object1.width > object2.positionX - Map.offsetX &&
    object1.positionY < object2.positionY + object2.height &&
    object1.positionY + object1.height > object2.positionY
  );
};
//collison between bullet and character/PowerUpBox
export const collisionBetweenWithGuardBullet = (
  object1: Bullet,
  object2: Character | PowerUpBox
) => {
  return (
    object1.positionX < object2.positionX - Map.offsetX + object2.width &&
    object1.positionX + object1.width > object2.positionX - Map.offsetX &&
    object1.positionY < object2.positionY + object2.height &&
    object1.positionY + object1.height > object2.positionY
  );
};

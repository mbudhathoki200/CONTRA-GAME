# Contra Game

## Overview

This project is a Contra-inspired 2D platformer game, developed using TypeScript and HTML5 Canvas. The game features a player character navigating through a map, fighting various types of enemies, and collecting power-ups.

## Features

- **Player Character**: The player can move left, right, jump, and shoot.
- **Enemies**: Different types of enemies including running enemies, guard enemies, and tanks.
- **Power-ups**: Collect power-up boxes to gain abilities or bonuses.
- **Score and Life Display**: Player's score and life are displayed on the screen.
- **Explosions**: Visual effects for explosions when enemies or objects are destroyed.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/contra-game.git
   cd CONTRA
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

Open your browser and navigate to `http://localhost:3000` to start the game.

## Controls

- **Arrow Left**: Move left
- **Arrow Right**: Move right
- **Arrow Up**: Jump
- **Arrow Down**: Crouch
- **Z**: Shoot
- **X**: Jump

## Game Structure

- **Main File**: `main.ts`
- **Classes**:
  - `Map`: Handles the game map.
  - `Player`: Controls the player character.
  - `RunningEnemy`, `GuardEnemy`, `Tank`, `MainTank`: Different enemy types.
  - `Explosion`: Handles explosion effects.
  - `Platform`: Manages platform positions and collisions.
  - `PowerUpBox`: Handles power-up boxes.
- **Constants**: Various game constants like canvas size, enemy positions, etc.
- **Utilities**: Utility functions for displaying score, player life, handling audio, and input.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to customize this README file further according to your project's specific details and requirements.

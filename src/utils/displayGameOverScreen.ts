import {
  gameOverScreen,
  gameScreen,
  highScoreShow,
  restartBtn,
  scoreShow,
  startScreen,
} from "../elements";
import { PLAYER } from "./../constants/constant";

export default function displayGameOver(): void {
  gameScreen.style.display = "none";
  startScreen.style.display = "none";

  gameOverScreen.style.display = "flex";

  let highScore = parseInt(localStorage.getItem("highScore") || "0");

  if (PLAYER.SCORE > highScore) {
    localStorage.setItem("highScore", JSON.stringify(PLAYER.SCORE));
  }
  highScore = parseInt(localStorage.getItem("highScore") || "0");
  highScoreShow.innerText = `your high score : ${highScore}`;

  scoreShow.innerText = `your score : ${PLAYER.SCORE}`;
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
}

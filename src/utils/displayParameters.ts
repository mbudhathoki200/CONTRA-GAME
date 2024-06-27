import { PLAYER } from "../constants/constant";

export function displayPlayerScore(ctx: CanvasRenderingContext2D): void {
  ctx.font = "20px VT323";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + PLAYER.SCORE, 20, 30);
}
export function displayPlayerLife(ctx: CanvasRenderingContext2D): void {
  ctx.font = "20px VT323";
  ctx.fillStyle = "white";
  ctx.fillText("Life: " + PLAYER.LIFE, 20, 60);
}

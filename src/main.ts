import Phaser from "phaser";
import { gameConfig } from "./game.config";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("App root #app was not found.");
}

document.body.style.margin = "0";
document.body.style.background = "#f8f1e7";
document.body.style.fontFamily = "'Trebuchet MS', 'Verdana', sans-serif";
appRoot.style.width = "100vw";
appRoot.style.height = "100vh";
appRoot.style.overflow = "hidden";

new Phaser.Game(gameConfig);

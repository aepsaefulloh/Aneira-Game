import Phaser from "phaser";
import { gameConfig } from "./game.config";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("App root #app was not found.");
}

const BG = "#f8f1e7";

// Center the game as a portrait column on tablets and desktop.
// On phones the column fills the full viewport naturally.
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.background = BG;
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.minHeight = "100vh";
document.body.style.fontFamily = "'Trebuchet MS', 'Verdana', sans-serif";

// Cap at 480 px so the portrait canvas never appears as a thin shard
// on a wide browser — it stays a centred column instead.
appRoot.style.width = "100%";
appRoot.style.maxWidth = "480px";
appRoot.style.height = "100vh";
appRoot.style.overflow = "hidden";
appRoot.style.background = BG;
appRoot.style.position = "relative";

new Phaser.Game(gameConfig);

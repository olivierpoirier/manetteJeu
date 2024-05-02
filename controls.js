import { gameHeight} from "./constants.js";
import { player, speedOfPlayer } from "./player.js";

let keys = {};
let keysDiv;

function keyDown(e) {
  try {
    //console.log(e.keyCode);
    keys[e.keyCode] = true;
  } catch(e) {
    console.error(e);
  }

}

function keyUp(e) {
  try {
    //console.log(e.keyCode);
    keys[e.keyCode] = false;
  } catch(e) {
    console.error(e);
  }
}



export function movementControl(isTouchedByWallByTop, isTouchedByWallByLeft, isTouchedByWallByBottom, isTouchedByWallByRight) {
  try {
    if(player.y >= 0){
      if(!isTouchedByWallByTop) {
        if(keys["38"]){
          player.y -= speedOfPlayer;
        }
      }
    }
    if(player.y < gameHeight - player.height){
      if(!isTouchedByWallByBottom) {
        if(keys["40"]){
          player.y += speedOfPlayer;
        }
      }
    }
    if (!isTouchedByWallByLeft) {
      if(keys["37"]){
        player.x -= speedOfPlayer;
      }
    }
    if (!isTouchedByWallByRight) {
      if(keys["39"]){
        player.x += speedOfPlayer;
      }
    }
    if(keys['80']) {
      console.log('allo')
      let aud = new Audio("Audio/menu.mp3");
      aud.play();
    }
  } catch(e) {
    console.error(e);
  }
    
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
keysDiv = document.querySelector("#keys");
const appId = "11BB1EAA";
let currentSession;
const nameSpace1 = "urn:x-cast:gameChannel";


function sessionListener(newSession) {
    currentSession = newSession;
    console.log(newSession);
}


function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error);
}

function initializeApiOnly() {

    const sessionRequest = new chrome.cast.SessionRequest(appId);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    console.log(sessionListener.message);
}

document.getElementById("con").addEventListener("click", () => {

    initializeApiOnly();
});





function receiverListener(availability) {
}

function sendCommands() {
    let message = {};
    message = JSON.stringify(message);
    currentSession.sendMessage(nameSpace1, message);
}

function getWindowPosition() {

    try {
        if(currentSession != undefined) {
            let whereIsGoingPlayerX;
            let whereIsGoingPlayerY;
        
            if(window.screenX - window.innerWidth/2 < window.screen.availWidth*0.05){
                console.log("Sprite goes left");
                whereIsGoingPlayerX = "Left";
            } else if(window.screenX + window.innerWidth/2 > window.screen.availWidth*0.60){
                console.log("Sprite goes right");
                whereIsGoingPlayerX = "Right";
            } else {
                console.log("Sprite don't move on x");
                whereIsGoingPlayerX = "Stays";
            } 
      
        
            if(window.screenY - window.innerHeight/2 < window.screen.availHeight*0.01){
                console.log("Sprite goes up");
                whereIsGoingPlayerY = "Up";
            } else if(window.screenY + window.innerHeight/2 > window.screen.availHeight*0.50){
                console.log("Sprite goes down");
                whereIsGoingPlayerY = "Down";
            } else {
                console.log("Sprite don't move on y");
                whereIsGoingPlayerY = "Stays";
            } 
    
            let objPosition = {
                whereIsGoingPlayerX: whereIsGoingPlayerX,
                whereIsGoingPlayerY: whereIsGoingPlayerY
            }
            let messageToSend = JSON.stringify(objPosition);
            currentSession.sendMessage(nameSpace1, messageToSend);
            console.log("mesage send");
        }
    } catch(e) {
        console.error(e);
    }


}

setInterval(getWindowPosition, 15)
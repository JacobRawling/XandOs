//'main entry point'. Basically great the game object, initialize it and get into the loop.

//great a gloabl game cclass
game = new GameClass();

//wait until DOM content is loaded to begin.
document.addEventListener("DOMContentLoaded",onDeviceReady, false);

//initialize the game 
function onDeviceReady(){
	init();
	game.init();
	game.start();
}

//Game manager that sets up the game and initializes everything. 
//Should be a singleton, so only one exists!!

function GameClass(){

	var that 		= this;
			
	//provide context for the window.
	var canvas 		= document.getElementById('Canvas');
	//canvas.width = document.width;//body.clientWidth;
	//canvas.height = document.height;//body.clientHeight;
	WINDOW_WIDTH = canvas.width;
	WINDOW_HEIGHT = canvas.height;
	var context		= canvas.getContext('2d');
	scaling_factor = Math.min( canvas.width/520, canvas.height/320);

	//create objects that manage key parts of the game, pretty self explanteerity
	var mouse_object    = 0;
	var user_interface  = 0;
	var player 	        = 0;
	var board           = 0;
    var noughts_turn    = true;
	var winner 			= 0;
	
	//statevariables that manage where we are withing the game.
	var game_state  	= MAINMENU;	//see constants.js for what constants are avaliable.
	var ingame_state	= PLAYING;
	var difficulty      = HARD;
	var offset = 150;
	
	//initializes all the objects and buttons, this should be called AFTER preloading. 
	this.init = function(){
	//initialize import objects
		mouse_object    = new MouseObject();
		user_interface  = new UserInterface();
		board           = new BoardObject();
		//initialize the mouse object so that we can detect clicks
		mouse_object.init(canvas);
		user_interface.init(canvas);
	};
	
	//start the game and begin the main lopo. GameLoop is an EXTERNAL function below.
	//required due to my inaddequices as a javascript programmer.
	this.start = function(){
		GameLoop();
	};
	
	//called once a frame and is the inards of the main game loop
	this.Loop = function(){	
		//clear the screen
		clear();		
			
		//update the user interface to show all the necessary things 
		switch(game_state){
			case PLAY:
				  if(!board.GetGameOver()){
					  board.Update(context,mouse_object);
					if(ingame_state == PLAYING){
					  player_one.Update( noughts_turn ,board,this);
					  player_two.Update( noughts_turn ,board,this);
					}
				 }else{
				     board.Update(context,mouse_object);
					 winner = board.GetWinner();
					 if(winner != EMPTY)
						ingame_state = GAMEOVER;
				 }					
				break;
			case MAINMENU:
				break;
		}
		
		
		user_interface.Update(that,context,mouse_object,player);
	};
	
	//clear the canvas to black
	var clear = function(){
		context.beginPath();
		context.fillStyle ="#FF2D2D";
		context.rect(0, 0, canvas.width, canvas.height);
		context.closePath();
		context.fill();
	}
		
	this.GetDifficulty = function(){
		return difficulty;
	}
	this.IncreaseDifficulty = function(){
		if(difficulty < HARD)
			difficulty++;
	}
	
	this.DecreaseDifficulty = function(){
		if(difficulty > EASY)
			difficulty--;
	}
	
	this.StartGame = function(Opponent){		
	    var random_var = Math.floor((Math.random()*2));
		noughts_turn = true;
		player_one      = new PlayerObject( ( random_var > 0 ? false : true) );
		if(Opponent == HUMAN)			
			    player_two = new PlayerObject( ( random_var > 0 ? true : false) );
		else
			    player_two = new AIPlayerObject( ( random_var > 0 ? true : false),Opponent );
		
		game_state   = PLAY;
		ingame_state = PLAYING;
		board.init();
		
	}
	
	this.GetWinner = function(){
		return winner;
	}
	this.EndTurn = function(noughts){
		 noughts_turn = !noughts_turn;
	 }
		
	//getters and setters
	this.GetState = function(){
		return game_state;
	}
	this.SetState = function(new_state){
		game_state = new_state;
	}
	this.GetIngameState = function(){
		return ingame_state;
	}
	this.SetIngameState = function(new_state){
		ingame_state = new_state;
	}
};


//best way to loop the window
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 50);
      };
})();

//initialize everthings
function init() {
	//adding our files to the queue	
	init_resources();
}

function GameLoop(){
	game.Loop();
	
	requestAnimFrame(GameLoop);
}

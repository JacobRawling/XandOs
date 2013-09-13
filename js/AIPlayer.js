	
//------------------------------------------------------------------------------------------
//Author: Jacob Rawling
//Date:   04/06/2013
//
//The AI Player Object for the game handles the AI's moves and utilizes and depth 3 minimax 
//algorithim.
//
//-----------------------------------------------------------------------------------------


function AIPlayerObject(playing_as_noughts,Opponent){
var noughts = playing_as_noughts;	//boolean for if we are noughts 
var difficulty = Opponent;

// alert(noughts);
 var minimax = function(depth,board_image,maximize){
    var no_turns         = board_image.GetNoAvaliableTurns();		
	var empty_position   = board_image.GetAvaliabePositionsList();
    var board_image_copy = new BoardImage();	//copy the board and then iterate over the copies making the possible changes
	board_image_copy.init(board_image); 		//performs the copy.
	
    var score		     = 0;	//the value of each board as it is iterated through
	var best_score 		 = (maximize ? -100000 : 100000 );	//the best score that is achived
	var best_position	 = -1;	//the opitimal position to play 
	
	//check to see if we are out of possible moves or iterations
	if(no_turns <= 0 || depth ==0)
		return new Array(board_image.EvalScore(noughts),0);
		
	//cycle through the possible moves
	for(var i = 0; i< no_turns;i++){		
		//play a possible move
		if(maximize) //its my turn so play either the type I am 
			board_image_copy.SetSquare(empty_position[i],( noughts ? NOUGHTS:CROSSES));
		else		 //or the type I'm not
			board_image_copy.SetSquare(empty_position[i],( noughts ? CROSSES:NOUGHTS));
			
		//now evaluate the score of this move
		score  = minimax(depth-1,board_image_copy,!maximize)[0];
		
		//PERFORM THE RECURSION AND SELECT BEST MOVE!
		if( (maximize ? (score > best_score) : (score < best_score)) ){
			best_score 	  = score;
			best_position = empty_position[i];
		}
		
		//undo the previous move
		board_image_copy.ClearSquare(empty_position[i]);
	}
	
	return new Array(best_score, best_position);
	
 }
 
 this.Update = function(turn, board,game_object){ //turn indicates if its my turn or not 
	 if(turn == noughts){
		 board.SetSquare(minimax(difficulty,board.GetImage(),true)[1],noughts);
		 game_object.EndTurn(noughts);
		 return;
	 }
 };	
};
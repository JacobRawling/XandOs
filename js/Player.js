
//-----------------------------------------------
//Author: Jacob Rawling
//Date:   04/06/2013
//
//The Player Object for the game handles input for the player,
//players stats, and player state
//
//-----------------------------------------------

function PlayerObject(playing_as_noughts){

 var noughts = playing_as_noughts;

	//methods
	this.Update = function(turn, board,game_object){ //turn indicates if its my turn or not 
		if(turn == noughts){
				var square = board.GetSquareClicked();
				//	var square = 0;
				if(square != 9){
					if(board.SetSquare(square, noughts)!= -1)
						game_object.EndTurn(noughts);
				}
	}	

 };	
};
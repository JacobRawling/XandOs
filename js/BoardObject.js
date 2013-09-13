function BoardImage(){
	var grid_size = 3*3;
    var states = new Array();
    for(var i = 0;i < grid_size;i++){
       states[i] = EMPTY;
      // square_button = new Button("pause_button",50,48,1-25*scaling_factor,5,0.5*scaling_factor ,0.5*scaling_factor ,true);
    }
	
	this.init = function(board_image){
		if(arguments.length >= 1){
			for(var i = 0;i < grid_size;i++){
				states[i] = board_image.GetSquare(i);
			}
		}else{
			for(var i = 0;i < grid_size;i++){
				states[i] = EMPTY;
			}
		}
	}
	
	this.ClearSquare = function( square){
		states[square] = EMPTY;
	}

    this.GetNoAvaliableTurns = function(){
		if(this.CheckForWin() != EMPTY){
			return -1;
		}
			
        var turns = 0;

        for(var i = 0;i < grid_size;i++){
            if(states[i] == EMPTY){
                turns++;
             }
        }

       return turns;
    };


    this.GetAvaliabePositionsList = function(){
        var position = new Array();
        var position_count = 0;
		
		if(this.CheckForWin() == EMPTY){

			for(var i = 0;i < grid_size;i++){
				if(states[i] == EMPTY){
					position[position_count] = i;
					position_count++;
					}
			}
		}	
		
		return position;
    };

	//returns a score that is: 100, 10, 1, for 3-,2-,1-in a row if they are same type as given
	//					   or -100,-10,-1  for 3-,2-,1-in a row if they are opposite type as given							
	var EvalLine = function(row1,col1,row2,col2,row3,col3,my_type_is_noughts){
	      var score = 0;
		  var mySeed  =  (my_type_is_noughts ? NOUGHTS:CROSSES);
		  var oppSeed =  (my_type_is_noughts ? CROSSES:NOUGHTS);
		  // First cell
		  if (states[row1*3 + col1] == mySeed) {
			 score = 1;
		  } else if (states[row1*3 + col1] == oppSeed) {
			 score = -1;
		  }
	 
		  // Second cell
		  if (states[row2*3 + col2] == mySeed) {
			 if (score == 1) {   // cell1 is mySeed
				score = 10;
			 } else if (score == -1) {  // cell1 is oppSeed
				return 0;
			 } else {  // cell1 is empty
				score = 1;
			 }
		  } else if (states[row2*3 + col2] == oppSeed) {
			 if (score == -1) { // cell1 is oppSeed
				score = -10;
			 } else if (score == 1) { // cell1 is mySeed
				return 0;
			 } else {  // cell1 is empty
				score = -1;
			 }
		  }
	 
		  // Third cell
		  if (states[row3*3 + col3] == mySeed) {
			 if (score > 0) {  // cell1 and/or cell2 is mySeed
				score *= 10;
			 } else if (score < 0) {  // cell1 and/or cell2 is oppSeed
				return 0;
			 } else {  // cell1 and cell2 are empty
				score = 1;
			 }
		  } else if (states[row3*3 + col3] == oppSeed) {
			 if (score < 0) {  // cell1 and/or cell2 is oppSeed
				score *= 10;
			 } else if (score > 1) {  // cell1 and/or cell2 is mySeed
				return 0;
			 } else {  // cell1 and cell2 are empty
				score = -1;
			 }
		  }
		  return score;
	
	}
	this.EvalScore = function(my_type_is_noughts ){
	//	alert("in evaluate score" + my_type_is_noughts);
		//evaluate all possible lines and sum the result
		var score = 0;
		
		//horizontal lines
		for(var i = 0; i < 3;i++)
			score += EvalLine(i,0,i,1,i,2,my_type_is_noughts);
		
		//vertical lines
		for(var i =0; i < 3; i++)
			score += EvalLine(0,i,1,i,2,i,my_type_is_noughts);
			
		//diagonals
		score += EvalLine(0,0,1,1,2,2,my_type_is_noughts);
		score += EvalLine(0,2,1,1,2,0,my_type_is_noughts);
					
		return score;
	}
	
	//check for win condition returns who won NOUGHTS or CROSSEs, EMPTY if games not overr and DRAW if a draw
		//see constants.js
	this.CheckForWin = function(){
		var score = 0;
		//horizontal lines
		for(var i = 0; i < 3;i++){
			score = EvalLine(i,0,i,1,i,2,true);
			if(score == 100)
				return NOUGHTS;
			if(score == -100)
				return CROSSES;
		}
		
		//vertical lines
		for(var i =0; i < 3; i++){
			score = EvalLine(0,i,1,i,2,i,true);
			if(score == 100)
				return NOUGHTS;
			if(score == -100)
				return CROSSES
		}
			
		//diagonals
		score = EvalLine(0,0,1,1,2,2,true);
		if(score == 100)
			return NOUGHTS;
		if(score == -100)
			return CROSSES
			
		score = EvalLine(0,2,1,1,2,0,true);
		if(score == 100)
			return NOUGHTS;
		if(score == -100)
			return CROSSES;
		
		for(var i = 0;i < grid_size;i++)
			if(states[i] == EMPTY)
				return EMPTY;
			
		return DRAW;					
	}

    this.GetImage = function(){
        	return board_image;
    }
    this.GetSquare = function(square){
        if(square > 8 || square < 0)
            return 2;
        else 
             return states[square];
    };

	this.CurrentTurn = function(){
		return false;
	}
    this.GetDiagonal = function(){
	}
	
	this.SetSquare = function(square, value){
        if(square > 8)
			return 2;
		if(square < 0)
            return 2;
        
        states[square] = value;
    };
};


function BoardObject(){
    var board_image = new BoardImage();
    var grid_size   = 3*3;
	var n 			= 3;
	var square_size = (0.8*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT))/n;
    var square_button = new Array();
	//init the buttons that detect what part of the grid is detected
    for(var i = 0;i < n*n;i++){
        square_button[i] = new Button("square_button",
                        130,130,
                        (i%n)*(square_size/130)*130+(WINDOW_WIDTH-n*square_size)/2 ,
                        Math.floor(i/n)*(square_size/130)*130 + 0.1*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT) ,
                        (square_size/130), (square_size/130),true);
    }


    var cross_image  = new SpriteObject(68 ,68 ,1,1,1,"cross",24, square_size/68 , square_size/68 ,true,false);
    var nought_image = new SpriteObject(68 ,68 ,1,1,1,"nought",24, square_size/68 , square_size/68 ,true,false);
    var that = this;
	var game_over = false;
	var noughts_won = true;
	var winner = EMPTY;
	
	this.init = function(){
		noughts_won = true;
		game_over = false;
		board_image.init();
	}
	
    //do everthting we need to in a turn
    this.Update = function(context,mouse_object){
        // grid_image.Update((WINDOW_WIDTH-400*scaling_factor*0.8 	)/2,(WINDOW_HEIGHT-390*scaling_factor*0.8)/2,context,0);
		 DrawGrid(context);
         for(var i = 0; i < grid_size; i++){
             square_button[i].Update(context,mouse_object);
             if(board_image.GetSquare(i) == NOUGHTS){
                nought_image.Update( 
                        (i%n)*(4*scaling_factor+(square_size/130)*130)+(WINDOW_WIDTH-n*square_size)/2 ,
                        Math.floor(i/n)*(3*scaling_factor+(square_size/130)*130)+ 0.1*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT) ,
                        context,0);
             }
             if(board_image.GetSquare(i) == CROSSES){ 
                cross_image.Update( 
                        (i%n)*(square_size/130)*130+(WINDOW_WIDTH-n*square_size)/2 ,
                        Math.floor(i/n)*(square_size/130)*130 + 0.1*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT) ,
                        context,0); } 
         }

    };
	
	this.GetGameOver = function(){
		return game_over;
	}
	
	this.GetWinner = function(){
		return winner;
	}
	
	var DrawGrid = function(context){
		context.beginPath();
		context.fillStyle ="black";
		var square_size = (0.8*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT))/n	;
		for(var i = 0;i < n-1;i++){
			//vertical line
			context.rect((i+1)*square_size+(WINDOW_WIDTH-3*square_size)/2, 0.1*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT), 3*scaling_factor, 0.8*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT));
			context.rect((WINDOW_WIDTH-3*square_size)/2, 
						0.1*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT)+(i+1)*square_size,
						0.8*Math.min(WINDOW_WIDTH,WINDOW_HEIGHT), 
						3*scaling_factor );
			
		}
		context.closePath();
		context.fill();
	}
	//called wwhen the game is over
    var GameOver = function(noughts){
		winner    = noughts;
		game_over = true;
	//	restart();
    };

    //check to see if any of the squares were clicked on 
    this.GetSquareClicked = function(){
         for(var i = 0; i < grid_size; i++){
             if( square_button[i].GetClicked()){
                 return i;
             }
         }
         return grid_size;

    }

    //someone is trying to set a square to a nought or a cross
	this.SetSquare = function(square,noughts){
        if(square >= grid_size) //just tried to access outside grid
          return -1;
        
        //check that the square is empty
        if(board_image.GetSquare(square) == EMPTY){
          board_image.SetSquare(square, (noughts? NOUGHTS : CROSSES));

          //check for win condition
          win_state = board_image.CheckForWin();
		  
		  if(win_state != EMPTY)
			GameOver(win_state);
        }else 
			return -1;

    };
 
    this.GetImage = function(){
        return board_image;
    } 
};
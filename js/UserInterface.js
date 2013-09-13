// Manages what the game displays, also depends on state. 


function UserInterface(){
	//buttons
	var pause_button  	     = 0;
	var play_button  		 = 0;
	var settings_button 	 = 0;
	var achievement_button 	 = 0;
	var resume_button		 = 0;
	var shop_button    		 = 0;
	var play_again_button 	 = 0;
	var main_menu_button 	 = 0;
	
	
	//images used through out the game.
	var title_image = 0;
	var pause_image = 0;
	var game_over_image =0;
	var score_text_image = 0;
	var cash_text_image  = 0;
	
	//canvas size
	var width  = 0;
	var height = 0;
	
	var totals_summed = false;
	var total_cash          = 0;
	var total_cash_display  = 0;
	var total_score_display = 0;
	var cash_addition_counter = 0;
	
	var  score 		= 0;
    var  cash       = 0;
	this.rolling_x 	= 0;
	
	//initialize all the buttons, this sets their positions and scale. *scaling_factor
	this.init = function(canvas){
		//initialize the buttons used
		pause_button  	     = new Button("pause_button",50,48,WINDOW_WIDTH-25*scaling_factor,5,0.5*scaling_factor ,0.5*scaling_factor ,true);
		play_button  		 = new Button("play_button",166,48,(WINDOW_WIDTH-166*scaling_factor)/2,(WINDOW_HEIGHT-48*scaling_factor)/2,scaling_factor,scaling_factor,true);
		settings_button 	 = new Button("settings_button",133,23,WINDOW_WIDTH-133-20,WINDOW_HEIGHT-48,1.0,1.0,true);
		achievement_button 	 = new Button("achievement_button",209,24,20,WINDOW_HEIGHT-48,1.0,1.0,true);
		resume_button		 = new Button("resume_button",180,39,(WINDOW_WIDTH-180)/2,10+53*scaling_factor,scaling_factor,scaling_factor,true);
		restart_button		 = new Button("restart_button",180,39,(WINDOW_WIDTH-180)/2,10+(53+39)*scaling_factor,1.0,1.0,true);
		
		play_again_button 	 = new Button("play_again_button",212,110,20,60,0.6*scaling_factor,0.6*scaling_factor,true);
		main_menu_button 	 = new Button("main_menu_button",240,39,(WINDOW_WIDTH-240)/2,10+(53+39+39)*scaling_factor,scaling_factor,scaling_factor,true);
		
		left_arrow_button    = new Button("left_arrow_button",37,26,(WINDOW_WIDTH-336*0.5*scaling_factor)/2 - 40*scaling_factor,(WINDOW_HEIGHT-26*scaling_factor)/2,scaling_factor,scaling_factor,true);
		right_arrow_button    = new Button("right_arrow_button",37,26,(WINDOW_WIDTH+336*0.5*scaling_factor)/2 ,(WINDOW_HEIGHT-26*scaling_factor)/2,scaling_factor,scaling_factor,true);
		
		play_vs_easy 		 = new Button("play_vs_easy", 
										330, 66,
										(WINDOW_WIDTH-336*0.5*scaling_factor)/2, 
										(WINDOW_HEIGHT-66*0.5*scaling_factor)/2,
										0.5*scaling_factor,
										0.5*scaling_factor,true);
		play_vs_med 		 = new Button("play_vs_med", 
										330, 66,
										(WINDOW_WIDTH-336*0.5*scaling_factor)/2, 
										(WINDOW_HEIGHT-66*0.5*scaling_factor)/2,
										0.5*scaling_factor,
										0.5*scaling_factor,true);
		play_vs_hard 		 = new Button("play_vs_hard", 
										330, 66,
										(WINDOW_WIDTH-336*0.5*scaling_factor)/2, 
										(WINDOW_HEIGHT-66*0.5*scaling_factor)/2,
										0.5*scaling_factor,
										0.5*scaling_factor,true);
		play_vs_human 		 = new Button("play_vs_human", 
										330, 66,
										(WINDOW_WIDTH-336*0.5*scaling_factor)/2, 
										(WINDOW_HEIGHT-66*0.5*scaling_factor)/2+3*66*0.5*scaling_factor,
										0.5*scaling_factor,
										0.5*scaling_factor,true);
		
		//initialize images that are needed.
		title_image = new SpriteObject(336 ,104 ,1,1,1,"title",24, scaling_factor ,scaling_factor ,true,false);
		game_over_image = new SpriteObject(400 ,56 ,1,1,1,"game_over",24, scaling_factor ,scaling_factor ,true,false);
		draw_image = new SpriteObject(420 ,48 ,1,1,1,"draw",24, scaling_factor ,scaling_factor ,true,false);
		noughts_won_image = new SpriteObject(420 ,48 ,1,1,1,"noughts_won",24, scaling_factor ,scaling_factor ,true,false);
		crosses_won_image = new SpriteObject(420 ,48 ,1,1,1,"crosses_won",24, scaling_factor ,scaling_factor ,true,false);
		transparent_image = new SpriteObject(130 ,260 ,1,1,1,"transparent_bg",24, WINDOW_WIDTH/130 ,WINDOW_HEIGHT/260 ,true,false);
		pause_image = Resources["pause"];
	};
	
	
	//called once per frame 
	this.Update = function(game_object,context,mouse_object,player){
		switch(game_object.GetState()){
			case MAINMENU:
				//draw the sprite and buttons
				title_image.Update((WINDOW_WIDTH-336*scaling_factor)/2,0,context,0);
				play_vs_human.Update(context,mouse_object);
				right_arrow_button.Update(context,mouse_object);
				left_arrow_button.Update(context,mouse_object);
				if(right_arrow_button.GetClicked())
					game_object.IncreaseDifficulty();
				if(left_arrow_button.GetClicked())
					game_object.DecreaseDifficulty();
					
				
				switch(game_object.GetDifficulty()){
					case EASY:
						play_vs_easy.Update(context,mouse_object);
						if(play_vs_easy.GetClicked())
							game_object.StartGame(EASY);
						break;
					case MED:
						play_vs_med.Update(context,mouse_object);
						if(play_vs_med.GetClicked())
							game_object.StartGame(MED);		
						break;
					case HARD:
						play_vs_hard.Update(context,mouse_object);	
						if(play_vs_hard.GetClicked())
							game_object.StartGame(HARD);
						break;
				}
				//check if we need to move on
				if(play_vs_human.GetClicked()){
					game_object.StartGame(HUMAN);
				}
				
				break;
			case PLAY:
				//handle the ingame state
				switch(game_object.GetIngameState()){
					case PLAYING:	
					   pause_button.Update(context,mouse_object);
					   
					   if(pause_button.GetClicked())
						 game_object.SetIngameState(PAUSED);
						
						
						 
					break;
				case PAUSED:
					transparent_image.Update(0,0,context,0);
					 
					//update the buttons
					resume_button.Update(context,mouse_object);
					if(resume_button.GetClicked())
						game_object.SetIngameState(PLAYING);
					restart_button.Update(context,mouse_object);
					if(restart_button.GetClicked())
						game_object.StartGame(game_object.GetDifficulty());
					main_menu_button.Update(context,mouse_object);
					if(main_menu_button.GetClicked())
						game_object.SetState(MAINMENU);
					break;
				
				case GAMEOVER:
					transparent_image.Update(0,0,context,0);
				//	game_over_image.Update( (WINDOW_WIDTH-game_over_image.GetWidth())/2, 0,context,0);
					
					switch(game_object.GetWinner()){
						case DRAW:
							draw_image.Update( (WINDOW_WIDTH-draw_image.GetWidth())/2,0,context,0);
							break;
						case NOUGHTS:
							noughts_won_image.Update( (WINDOW_WIDTH-noughts_won_image.GetWidth())/2,0,context,0);
							break;
						case CROSSES:
							crosses_won_image.Update( (WINDOW_WIDTH-crosses_won_image.GetWidth())/2,0,context,0);
							break;
					}
					
					restart_button.Update(context,mouse_object);					
					if(restart_button.GetClicked()){
						game_object.StartGame(game_object.GetDifficulty());
					}
					main_menu_button.Update(context,mouse_object);
					if(main_menu_button.GetClicked())
						game_object.SetState(MAINMENU);
					
				    break;
				  }
			 break;
			 
		  }
	};

};
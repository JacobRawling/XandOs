
function preload_resources(sources, callback)
{

  Resources = new Object();
  for (i = 0, length = sources.length; i < length; ++i) {
	Resources[sources[i].id] = new Image();
    Resources[sources[i].id].src = sources[i].src;

  }
  
 }	

function init_resources() {
	//adding our files to the queue	
	preload_resources([
						{id: "pause_button", src:"img/pause_button.png"},
						{id: "play_again_button", src:"img/play_again_button.png"},
						{id: "resume_button", src:"img/resume_button.png"},
						{id: "main_menu_button", src:"img/main_menu_button.png"},
						{id: "pause", src:"img/pause.png"},
						{id: "game_over", src:"img/game_over.png"},
						{id: "draw", src:"img/draw.png"},
						{id: "noughts_won", src:"img/noughts_won.png"},
						{id: "crosses_won", src:"img/crosses_won.png"},
						{id: "square_button", src:"img/square_button.png"}, 
						{id: "cross", src:"img/cross.png"}, 
						{id: "nought", src:"img/nought.png"}, 
						{id: "title", src:"img/title.png"},
						{id: "transparent_bg", src:"img/transparent_bg.png"},
						{id: "restart_button", src:"img/restart_button.png"},
						{id: "play_vs_easy", src:"img/play_vs_easy.png"},
						{id: "play_vs_hard", src:"img/play_vs_hard.png"},
						{id: "play_vs_med", src:"img/play_vs_med.png"},
						{id: "play_vs_human", src:"img/play_vs_human.png"},
						{id: "right_arrow_button", src:"img/right_arrow_button.png"},
						{id: "left_arrow_button", src:"img/left_arrow_button.png"}
					  ]);
						 
}

//Constants - Nasty constant sheet so that i know what means what 

//
var WINDOW_HEIGHT = 320;
var WINDOW_WIDTH  = 500;

var WARDEN 	   = 0;
var COPTER_HAT = 1;
var FAN 	   = 2;
var ROCKET 	   = 3;
var CASH 	   = 4;
var NURSE 	   = 5;
var TRAMPOLINER= 6;
var WALL1				= 7;

//GAME STATEs
var MAINMENU   = 0;
var PLAY	   = 1;

//ingame state.
var PLAYING	   = 0;
var PAUSED	   = 1;
var GAMEOVER   = 2;

//inanimate obejcts
var DOOR 				= 0;
var SHELF				= 1;
var FIRE_EXTINQUISHER	= 2;
var WINDOW				= 3;

//player states 
var TURN = 0;

//nvasty global scaling factors so thst things willfit on whatever size screen;
var scaling_factor = 1;

//board states
var EMPTY   = 0;
var NOUGHTS = 1;
var CROSSES = -1;
var DRAW    = -2;

var EASY  = 1;
var MED   = 2;
var HARD  = 3;
var HUMAN = 0;
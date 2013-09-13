//-------------------------------------------------------------------
//
//Author: Jacob Rawling
//Date  : 06/2013
//
//A simple object that handles all the mouse input and stores it.
//
//-------------------------------------------------------------------

function MouseObject(){
	//stored data
	var mouse_x = 0, mouse_y = 0;
	var mouse_clicked = false;
    var mouse_up       = false;
    var mouse_down     = false;
	var that = this;

	//Getters for the info
	this.X = function(){
		return that.mouse_x;
	};
	this.Y = function(){
		return that.mouse_y;
	};

	this.GetClicked = function(){
		return mouse_clicked;
	};
	this.mouseDown = function(event){
        that.mouse_x = event.clientX;
        that.mouse_y = event.clientY;	
		mouse_clicked = true;
	};
    this.mouseUp = function(event){
        that.mouse_x = event.clientX;
        that.mouse_y = event.clientY;
        mouse_clicked = false;
    };
    this.move = function(event){
        that.mouse_x = event.clientX;
        that.mouse_y = event.clientY;
		alert(event);
    };
	
	this.init = function(canvas){	
		document.body.onmouseup   = that.mouseUp;
		document.body.onmousedown = that.mouseDown;
		document.body.onmousemove = that.move;
		
		this.mouse_x = 0;
		this.mouse_y 	= 0;
	};
	
};

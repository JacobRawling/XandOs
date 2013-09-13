//-------------------------------------------------------------------
//
//Author: Jacob Rawling
//Date:	  06/2013
//
//A simple button object that supports mouse over functionality intended
//for use in a canvas based HTML5 date.
//
//-------------------------------------------------------------------
function Button(image_fp, Width, Height, X,Y,scaleX,scaleY,asset_mang){
	
	var count      = 0;
	
	if(arguments.length < 8){
		var sprite = new SpriteObject( Width, Height, 2, 1,2, image_fp,24,scaleX, scaleY, false,false);
	}else{
		var sprite = new SpriteObject( Width, Height, 2, 1,2, image_fp,24,scaleX, scaleY, true,false);
	}
	
	var width = Width;
	var height = Height;

	var x = X;
	var y = Y;
	var scalex = scaleX;
	var scaley = scaleY;

	var clicked = false;
	var mouse_over = false;
	//methods
	this.GetClicked = function(){
	    return clicked;
	};
	
	
	//called once per frame and calls draw as well
	this.Update         = function(destination,mouse){
        count++;

		//check to see if mouse is over 
		mouse_over = false;
        if(mouse.X() > x )
            if(mouse.X() < x + width*scalex)
                if(mouse.Y() > y )
                    if(mouse.Y() < y + height*scaley){
            mouse_over = true;
        }

		//check if its clicked
		if(mouse_over){
			sprite.Update(x,y,destination, 0);
			sprite.ChangeToFrame(1);
			if(mouse.GetClicked())
				if(count > 35){
				 count = 0;
				 clicked = true;
				}else
					clicked = false;
		} else {
				sprite.ChangeToFrame(0);
				sprite.Update(x,y,destination, 0);
				clicked = false;
		}

    };
};
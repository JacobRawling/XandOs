function SpriteObject(Width,Height,Frames,Columns,Rows,Image_path,FPS,Scalex,Scaley,asset_mang,Animation ){
    var width          = Width;
    var height         = Height;
    var no_frames      = Frames;
    var current_frame  = 0;
    var cols           = Columns;
    var rows           = Rows;
	if(arguments.length < 10){
			var image          = new Image();
			image.src          = Image_path;
		}else{
			var image 			= Resources[Image_path];
		}
    var FPS            = FPS;
    var sys_FPS        = 50;
    var counter        = 0;
    var scalex         = Scalex;
    var scaley         = Scaley;

	if(arguments.length < 11)
		var animation   = true;//is this an animation as aposed to a collection of related images.
	else
		var animation = Animation;
		
    this.SetAnimation = function(Animation_Status){
        animation = Animation_Status;
    }

    this.GetWidth = function(){
        return width*scalex;
    };
    this.GetHeight = function(){
        return height*scalex;
    };
    this.ChangeToFrame = function(new_frame){
        if(new_frame >= 0 &&
            new_frame <= no_frames)
        current_frame = new_frame;
    }


    this.Update = function(x,y,contex,camera){
        //draw the sprite at x,y
        try{
            //try and draw the image
            if(camera != 0)
                contex.drawImage(image,
                    width*( (current_frame)%cols),
                    height*( (current_frame)%rows),
                    width, height,
                    x - camera.x,
                    y - camera.y,
                    width*scalex, height*scaley);
            else{
                contex.drawImage(image,
                    width*( (current_frame)%cols),
                    height*( (current_frame)%rows),
                    width, height,
                    x,
                    y,
                    width*scalex, height*scaley);
            }
        }catch(e){
            //alert('failed to draw a sprite');
        }//end catch(e)

        if(animation){
            //update the time counter by one
            counter += 1/sys_FPS;

            //if the time elapsed since last frame is greater than it should be from set FPS
            //Go to Next frame
            if(counter >= 1/FPS){
                current_frame++;

                if(current_frame > no_frames)
                    current_frame = 0;

                counter = 0;
            }//end if(counter >= 1/FPS)

        } //end if animation
    }//end this.Update = function(...)

};
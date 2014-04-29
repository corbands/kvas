Sorter sorter;
Params params;

void setup()
{
	background(#eeeeee);
	
	sorter = new Sorter();
	params = new Params(320, 240);

	size(params.width, params.height);

	noLoop();
}

void draw_text(String t, int x, int y)
{
	background(#eeeeee);
	fill(#666600);
	stroke(#cccc33);
	strokeWeight(5);	
	textSize(36);

	text(t, x, y);
}

void draw_sort(Sorter s)
{        
   background(#eeeeee);
   for (int i=0; i < s.elems_data.length; ++i)
   {
       SortElement e = s.elems_data[i];
       /*
       if (i == s.pivot)
       	  fill(#dd0000);
   	   else if (i == s.i)
		  fill(#dddd00);   
   	   else if (i == s.j)
   		  fill(#0000dd);   	   		 
	   else       	  
       	  fill(#00dd00);
   	 */
   	   fill(#00dd00);
       stroke(#000000);
       ellipse(e.x, e.y, e.r, e.r);


       fill(0, 0, 0);       
       text(str(s.i), 100, 120);
   	   text(str(s.pivot), 120, 120);
   	   text(str(s.j), 140, 120);

   	   fill(255, 255, 255);
       text(str(e.value), e.x-2, e.y+2);
   }   
}


Sorter get_sorter()
{
	return sorter;
}

Params get_params()
{
	return params;
}

//----------------------------------------------//
// classes
//----------------------------------------------//
class Sorter
{
	SortElement[] elems_data;	
	int i;
	int j;
	int pivot;	
}

class Params
{
	int width;
	int height;
	
	Params(int w, int h)
	{
		width = w;
		height = h;
	}
}


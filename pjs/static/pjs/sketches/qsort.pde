Sorter sorter;
Params params;

void setup()
{
	background(#cccc99);
	
	sorter = new Sorter();
	params = new Params(320, 240);

	size(params.width, params.height);

	noLoop();
}

void draw_text(String t, int x, int y)
{
	background(#cccc99);
	fill(#666600);
	stroke(#cccc33);
	strokeWeight(5);	
	textSize(36);

	text(t, x, y);
}

void draw_sort(Sorter s)
{        
   background(#cccc99);
   for (int i=0; i < s.elems.length; ++i)
   {
       SortElement e = s.elems[i];
       fill(#666600);
       stroke(#cccc33);
       ellipse(e.x, e.y, e.r, e.r);
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

class Arr
{
	int i;
	Arr(int i)
	{
		this.i = i;
	}
}

Arr arr = new Arr(5);
Arr get_arr()
{
	return arr;
}

class Sorter
{
	SortElement[] elems;	
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


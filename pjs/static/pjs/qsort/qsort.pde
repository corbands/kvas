Params params;
Sorter sorter;

void setup()
{
	background(#eeeeee);
	
	params = new Params(640, 360);
	size(params.width, params.height);

	sorter = new Sorter();

	noLoop();
}

void run_loop()
{
	loop();
}

void stop_loop()
{
	noLoop();
}

void draw_start_configuration(String[] s)
{ 
	sorter.clear();
    params.elems = init_sort_elems(s);
   
    background(#eeeeee);
   	int x = 20;
   	int y = 20;
   	for (int i=0; i < params.elems.length; ++i)
   	{
		SortElement e = params.elems[i];

   		fill(#00dd00);
        stroke(#000000);
        ellipse(e.x, e.y, e.r, e.r);

    	fill(255, 255, 255);
       	text(str(e.value), e.x-2, e.y+2);	
   	}
}

void start_sort()
{
	sorter.captures = make_captures(params.elems);			
	loop();
}

void draw()
{
	SortCapture capture = sorter.get_capture();
	if (!capture)
	{
		noLoop();
		return;
	}

	background(#eeeeee);

	for (int i=0; i < capture.elems.length; ++i)
	{
		SortElement e = capture.elems[i];
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
        text(str(capture.i), 100, 120);
    	text(str(capture.pivot_index), 120, 120);
    	text(str(capture.j), 140, 120);

    	fill(255, 255, 255);
       	text(str(e.value), e.x-2, e.y+2);
	}
}

//----------------------------------------------//
// helpers
//----------------------------------------------//
SortElement[] init_sort_elems(String[] arr)
{
	SortElement[] elems = new SortElement[arr.length];

	int r = 20;
	float y = 60.0;

	int w = params.width;
	float diff = (w*3/4 - r*(2*arr.length-1)) / 2;
	float x = w/8 + diff;

	for (int i=0; i < arr.length; ++i)
	{
		SortElement se = new SortElement(x, y, r, parseInt(arr[i]));
		se.init();
		x += 2*r;		

		elems[i] = se;
	}      
	return elems;
}

//----------------------------------------------//
// classes
//----------------------------------------------//
class Sorter
{
	ArrayList<SortCapture> captures = new ArrayList<SortCapture>();

	int current_capture = 0;		// iterator must be here

	SortCapture get_capture()
	{		
		if (current_capture >= captures.size())	
			return null;

		return captures.get(current_capture++);
	}

	void clear()
	{
		captures.clear();
		current_capture = 0;
	}
}


class SortCapture
{
	SortElement[] elems;
	int i;
	int j;
	int pivot_index;

	SortCapture(SortElement[] elems, int i, int j, int pivot_index)
	{
		this.elems = new SortElement[elems.length];
		for (int k=0; k < elems.length; ++k)
		{
			SortElement e = elems[k];
			this.elems[k] = new SortElement(e.x, e.y, e.r, e.value);
		}

		this.i = i;
		this.j = j;		
		this.pivot_index = pivot_index;

	}
}


class Params
{
	int width;
	int height;
	SortElement[] elems;	// start config

	Params(int w, int h)
	{
		width = w;
		height = h;
	}
}


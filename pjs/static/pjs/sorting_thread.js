self.addEventListener('message', function(args)
{
	data = args.data;
	switch (data.cmd)
	{
		
		case 'start':			
			// create sort elements with input elemnts data (x, y, r, value)
			var elems = Array();						
			for (var i=0; i < data.elems_data.length; ++i)
			{
				elems[i] = new SortElement(data.elems_data[i]);
				elems[i].init_move_manager();
			}

			qsort(elems, 0, elems.length-1);

			break;
		case 'stop':		
			self.close();
			break;
	}
	
}, false);


function qsort(elems, p, q)
{
	var e = elems;

	var pivot_index = parseInt((p+q)/2)
	var pivot = e[pivot_index].elem_data.value;	
	var i = p;
	var j = q;

	while (i <= j)
	{		
		while (e[i].elem_data.value < pivot)
		{			
			draw_capture(elems, i, j, pivot_index, 1000);
			++i;
		}
		while (e[j].elem_data.value > pivot)
		{		
			draw_capture(elems, i, j, pivot_index, 1000);	
			--j;
		}

		if (i <= j)			// todo <
		{	
			e[j].set_destination(e[i].elem_data.x, e[i].elem_data.y, -1);
		    e[i].set_destination(e[j].elem_data.x, e[j].elem_data.y, 1); 
		    exchange_elements(e, i, j, pivot_index);      

			var temp = e[j];
			e[j] = e[i];
			e[i] = temp;
			++i;
			--j;
		}
	}
	if (i < q)
		qsort(e, i, q);
	if (p < j)
		qsort(e, p, j);

}

function exchange_elements(elems, i, j, pivot_index)
{
	var stop_moving = false;
	while (!stop_moving)
	{				
		draw_capture(elems, i, j, pivot_index, 25);
		var b1 = elems[i].move();
		var b2 = elems[j].move();		

		if (!b1 && !b2)
			stop_moving = true;
	}	
}

function get_elems_data(elems)
{
	var elems_data = Array();
	for (var i=0; i < elems.length; ++i)
	{
		var el = elems[i].elem_data;		
		elems_data[i] = new SortElementData(el.x, el.y, el.r, el.value);
	}
	return elems_data;
}

function draw_capture(elems, i, j, pivot_index, delay)
{	
	var elems_data = get_elems_data(elems);
	postMessage( {'elems_data': elems_data, 'i': i, 'j': j, 'pivot': pivot_index} );
	m = new Date().getTime();
	while (new Date().getTime() - m < delay)		// todo 25 - refresh delay
	{				
	}				
}

// class
function SortElementData(x, y, r, value)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.value = value;
}

function SortElement(elem_data)
{
	this.elem_data = elem_data;	// consist ElementData (x, y, r ,value)
	this.mm = null;

	this.init_move_manager = function()
	{
		this.mm = new MoveManager(this);
	};	

	this.set_destination = function(xd, yd, dir)
	{		
		this.mm.set_destination(this.elem_data.x, this.elem_data.y,
		 xd, yd, dir);
	};

	this.move = function()
	{
		return this.mm.move(this.elem_data);
	};

}

// class
function MoveManager(sort_element)
{
	this.elem = sort_element;

	this.set_destination = function(x0, y0, xd, yd, dir)
	{
		this.x0 = x0;	
		this.y0 = y0;
		this.xd = xd;
		this.yd = yd;
		this.dir = dir;
		this.state = 0;
	};

	this.move = function(elem)
	{
		if (this.dir == 1)
			return this.move_forward(elem);
		else if (this.dir == -1)
			return this.move_backward(elem);
	};
	

	this.move_forward = function(elem)
	{
		var x0 = this.x0;
		var y0 = this.y0;
		var x_dest = this.xd;
		var y_dest = this.yd;

		if (x0 == x_dest)
			return false;

		var ret = true;
	    var r = elem.r;
	    switch (this.state)
	    {
	     case 0:
	       elem.y += r/10.0;
	       elem.x += r/15.0;
	       if (elem.y >= y0 + r*3/2)
	         this.state = 1;       
	       break;
	    case 1:
	      elem.x += r/10.0;	      
	      if (elem.x > x_dest - r)
	        this.state = 2;
	      break;
	    case 2:                    
	      elem.x += r/15.0;
	      elem.y -= r/10.0;
	      if (elem.x >= x_dest - r/1000 && elem.y <= y_dest + r/1000)               
	         this.state = 3;
	            
	      break; 
	    case 3:      
	      ret = false;
	      break;
	    }    
	    return ret;
	};

	this.move_backward = function(elem)
	{
		var x0 = this.x0;
		var y0 = this.y0;
		var x_dest = this.xd;
		var y_dest = this.yd;

		if (x0 == x_dest)
      		return false;
    
	    var ret = true;
	    var r = elem.r;
	    switch (this.state)
	    {
	     case 0:
	       elem.y -= r/10.0;
	       elem.x -= r/15.0;
	       if (elem.y <= y0 - r*3/2)
	       {
	         this.state = 1;         
	       }      
	       break;
	    case 1:
	      elem.x -= r/10.0;      
	      if (elem.x < x_dest + r)
	        this.state = 2;
	      break;
	    case 2:                    
	      elem.x -= r/15.0;
	      elem.y += r/10.0;
	      if (elem.x <= x_dest + r/1000 && elem.y >= y_dest - r/1000)               
	         this.state = 3;
	                
	      break; 
	    case 3:      
	      ret = false;
	      break;
	    }    
	    return ret;
	};


}

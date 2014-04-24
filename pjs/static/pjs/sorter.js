var bound = false;
function activate_processing()
{
	pjs = Processing.getInstanceById('qsort');
	if (pjs != null)
	{
		bound = true;
		start_routine();
	}
	if (!bound)
		setTimeout(activate_processing, 10);
}
	
function on_worker_message(args)
{		
	var elems = args.data.elems;
	if (!elems)
	{
		worker.postMessage( {'cmd':'stop'} );
		return;
	}

	var sorter = pjs.get_sorter();

	var els = new Array();	

	for (var i=0; i < elems.length; ++i)
	{
		var el = elems[i];
		
		els[i] = new pjs.SortElement(el.x, el.y, el.r, el.value);
	}
	
	sorter.elems = els;
	sorter.i = 0;
	sorter.j = 4;
	sorter.pivot = 5;
	
	

	pjs.draw_sort(sorter);

}

function start_routine()
{	
	var arr_str = document.getElementById('input_text');
	var arr = arr_str.value.split(',');

	var elems = init(arr);		
	worker = new Worker(kSortingThreadPath);

	worker.addEventListener('message', on_worker_message, false);
	worker.postMessage( {'cmd':'start', 'elems': elems} );
} 

function init(arr)
{	
	elems = new Array();
	var params = pjs.get_params();	

	var r = 20;
	var y = 60;

	var w = params.width;
	var diff = (w*3/4 - r*(2*arr.length-1)) / 2;
	var x = w/8 + diff;

	for (var i=0; i < arr.length; ++i)
	{
		elems[i] = new Element(x, y, r, parseInt(arr[i]));
//		elems[i] = new pjs.SortElement(x, y, r, parseInt(arr[i]));
		x += 2*r;
	}
	
	return elems;
}

// handlers
function on_stop(sender)
{
	console.log("STOP!");
	worker.terminate();
	// worker.postMessage( {'cmd':'stop'} );
}

// class
function Element(x, y, r, value)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.value = value;
}

var bound = false;
function activate_processing()
{
	pjs = Processing.getInstanceById('qsort');
	if (pjs != null)
	{
		bound = true;
		prepare_sorting_data();
	}
	if (!bound)
		setTimeout(activate_processing, 10);
}

function prepare_sorting_data()
{
	var arr_str = document.getElementById('input_text');
	var arr = arr_str.value.split(',');

	var elems_data = init(arr);
	draw_sort_capture(elems_data, 0, elems_data.length-1, parseInt(elems_data.length/2));
}

function start_routine()
{		
	prepare_sorting_data();
	worker = new Worker(kSortingThreadPath);

	worker.addEventListener('message', on_worker_message, false);
	worker.postMessage( {'cmd':'start', 'elems_data': elems_data} );
}
	
function on_worker_message(args)
{	
	var elems_data = args.data.elems_data;
	if (!elems_data)
	{
		worker.postMessage( {'cmd': 'stop'} );
		return;
	}

	var i = args.data.i;
	var j = args.data.j;
	var pivot = args.data.pivot;
	draw_sort_capture(elems_data, i, j, pivot);	
} 

function draw_sort_capture(elems_data, i, j, pivot)
{
	var sorter = pjs.get_sorter();
	
	sorter.elems_data = elems_data;
	sorter.i = i;
	sorter.j = j;
	sorter.pivot = pivot;
	
	pjs.draw_sort(sorter);
}

function init(arr)
{	
	elems_data = new Array();
	var params = pjs.get_params();	

	var r = 20;
	var y = 60;

	var w = params.width;
	var diff = (w*3/4 - r*(2*arr.length-1)) / 2;
	var x = w/8 + diff;

	for (var i=0; i < arr.length; ++i)
	{
		elems_data[i] = new SortElementData(x, y, r, parseInt(arr[i]));
		x += 2*r;
	}
	
	return elems_data;
}

// classes
function SortElementData(x, y, r, value)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.value = value;
}

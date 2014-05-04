// processing activation 
var bound = false;
function activate_processing()
{
	pjs = Processing.getInstanceById('qsort');
	if (pjs != null)
	{
		bound = true;

		Processing.logger = console;
		draw_start_configuration();
	}
	if (!bound)
		setTimeout(activate_processing, 10);
}

function draw_start_configuration()
{
	var arr_str = document.getElementById('input_text');
	var arr = arr_str.value.split(' ');

	pjs.draw_start_configuration(arr);	
}

// handlers	
function on_start()
{
	pjs.start_sort();
}

function on_refresh()
{
	draw_start_configuration();
}

function on_stop()
{
	var btn_stop = document.getElementById('btn_stop');
	if (btn_stop.innerText == "Stop")
	{
		btn_stop.innerText = "Resume";
		pjs.stop_loop();
	}
	else 
	{
		btn_stop.innerText = "Stop";
		pjs.run_loop();
	}
}

activate_processing();

class ControlCanvas
{
	constructor
	(
		name, 
		size, 
		layers, 
		mousedown, 
		mousemove, 
		mouseout, 
		mouseover, 
		mouseup
	)
	{
		this.name = name;
		this.size = size;
		this.layers = layers;

		this.mousedown = mousedown;
		this.mousemove = mousemove;
		this.mouseout = mouseout;
		this.mouseover = mouseover;
		this.mouseup = mouseup;
	}

	// dom

	domElementUpdate()
	{
		if (this.display == null)
		{
			this.display = new Display(this.size);
			this.display.initialize();
			this.domElement = this.display.canvas;

			// hack
			var de = this.domElement;
			de.onmousedown = this.handleEventMouseDown.bind(this);
			de.onmousemove = this.handleEventMouseMove.bind(this);
			de.onmouseout = this.handleEventMouseOut.bind(this);
			de.onmouseover = this.handleEventMouseOver.bind(this);
			de.onmouseup = this.handleEventMouseUp.bind(this);

			// For touchscreens.
			de.ontouchstart = this.handleEventTouchStart.bind(this);
			de.ontouchmove = this.handleEventTouchMove.bind(this);
			de.ontouchend = this.handleEventTouchEnd.bind(this);
		}

		this.display.clear();

		for (var i = 0; i < this.layers.length; i++)
		{
			var layer = this.layers[i];
			if (layer.isVisible == true)
			{
				this.display.drawOther
				(
					layer.display, 
					layer.offset
				);
			}
		}

		return this.domElement;
	}

	// events

	handleEventMouseDown(event)
	{
		if (this.mousedown != null)
		{
			this.mousedown(event);
		}
	}

	handleEventMouseMove(event)
	{
		if (this.mousemove != null)
		{
			this.mousemove(event);
		}
	}

	handleEventMouseOut(event)
	{
		if (this.mouseout != null)
		{
			this.mouseout(event);
		}
	}

	handleEventMouseOver(event)
	{
		if (this.mouseover != null)
		{
			this.mouseover(event);
		}
	}

	handleEventMouseUp(event)
	{
		if (this.mouseup != null)
		{
			this.mouseup(event);
		}
	}

	handleEventTouchEnd(event)
	{
		this.handleEventMouseUp(event);
	}

	handleEventTouchMove(event)
	{
		this.handleEventMouseMove(event);
	}

	handleEventTouchStart(event)
	{
		this.handleEventMouseDown(event);
	}

}

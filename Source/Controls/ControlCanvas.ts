
class ControlCanvas extends Control
{
	size: Coords;
	layers: Layer[]; 
	mousedown: any; 
	mousemove: any; 
	mouseout: any;
	mouseover: any; 
	mouseup: any;

	display: Display;

	constructor
	(
		name: string, 
		size: Coords, 
		layers: Layer[], 
		mousedown: any, 
		mousemove: any, 
		mouseout: any, 
		mouseover: any, 
		mouseup: any
	)
	{
		super(name);

		this.size = size;
		this.layers = layers;

		this.mousedown = mousedown;
		this.mousemove = mousemove;
		this.mouseout = mouseout;
		this.mouseover = mouseover;
		this.mouseup = mouseup;
	}

	// dom

	domElementUpdate(): any
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
					layer.offset,
					null, null // ?
				);
			}
		}

		return this.domElement;
	}

	// events

	handleEventMouseDown(event: any): void
	{
		if (this.mousedown != null)
		{
			this.mousedown(event);
		}
	}

	handleEventMouseMove(event: any): void
	{
		if (this.mousemove != null)
		{
			this.mousemove(event);
		}
	}

	handleEventMouseOut(event: any): void
	{
		if (this.mouseout != null)
		{
			this.mouseout(event);
		}
	}

	handleEventMouseOver(event: any): void
	{
		if (this.mouseover != null)
		{
			this.mouseover(event);
		}
	}

	handleEventMouseUp(event: any): void
	{
		if (this.mouseup != null)
		{
			this.mouseup(event);
		}
	}

	handleEventTouchEnd(event: any): void
	{
		this.handleEventMouseUp(event);
	}

	handleEventTouchMove(event: any): void
	{
		this.handleEventMouseMove(event);
	}

	handleEventTouchStart(event: any): void
	{
		this.handleEventMouseDown(event);
	}

}

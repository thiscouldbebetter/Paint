
function ControlCanvas
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

{
	// dom
	
	ControlCanvas.prototype.domElementUpdate = function()
	{
		if (this.display == null)
		{
			this.display = new Display(this.size);
			this.display.initialize();
			this.domElement = this.display.canvas;

			// hack
			this.domElement.onmousedown = this.handleEventMouseDown.bind(this);
			this.domElement.onmousemove = this.handleEventMouseMove.bind(this);
			this.domElement.onmouseout = this.handleEventMouseOut.bind(this);
			this.domElement.onmouseover = this.handleEventMouseOver.bind(this);
			this.domElement.onmouseup = this.handleEventMouseUp.bind(this);
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

	ControlCanvas.prototype.handleEventMouseDown = function(event)
	{
		if (this.mousedown != null)
		{
			this.mousedown(event);
		}
	}

	ControlCanvas.prototype.handleEventMouseMove = function(event)
	{
		if (this.mousemove != null)
		{
			this.mousemove(event);
		}
	}

	ControlCanvas.prototype.handleEventMouseOut = function(event)
	{
		if (this.mouseout != null)
		{
			this.mouseout(event);
		}
	}

	ControlCanvas.prototype.handleEventMouseOver = function(event)
	{
		if (this.mouseover != null)
		{
			this.mouseover(event);
		}
	}

	ControlCanvas.prototype.handleEventMouseUp = function(event)
	{
		if (this.mouseup != null)
		{
			this.mouseup(event);
		}
	}

}

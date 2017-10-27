
function ToolViewSize()
{
	this.name = "ViewSize";
}

{
	// event handlers

	ToolViewSize.prototype.viewSizeXChanged = function(valueToSet)
	{
		this.parentView.size.x = valueToSet;
		this.viewSizeSet();
	}

	ToolViewSize.prototype.viewSizeYChanged = function(valueToSet)
	{
		this.parentView.size.y = valueToSet;
		this.viewSizeSet();
	}

	ToolViewSize.prototype.viewSizeSet = function()
	{
		var size = this.parentView.size;

		var layers = this.parentView.layers;

		var displayMain = this.parentView.control.children["viewCanvas"].display;
		displayMain.sizeSet(size);

		for (var i = 0; i < layers.length; i++)
		{
			var layer = layers[i];
			layer.display.sizeSet(size);
			displayMain.drawOther(layer.display, Coords.Instances.Zeroes);
		}
	}

	// control

	ToolViewSize.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var size = this.parentView.size;

			var returnValue = new ControlContainer
			(
				"controlToolViewSize",
				[
					new ControlLabel
					(
						"Canvas Size:"
					),

					new ControlNumberBox
					(
						"numberViewSizeX",
						size.x,
						this.viewSizeXChanged.bind(this)
					),

					new ControlNumberBox
					(
						"numberViewSizeY",
						size.y,
						this.viewSizeYChanged.bind(this)
					),
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}


function ToolPaint()
{
	this.name = "Paint";
}

{
	// event handlers

	ToolPaint.prototype.processMouseDown = function()
	{
		// do nothing
	}

	ToolPaint.prototype.processMouseMove = function()
	{
		var tools = this.parentView.tools;

		var layerSelected = this.parentView.layerSelected();

		layerSelected.display.drawLine
		(
			this.parentView.mousePosPrev, 
			this.parentView.mousePos,
			tools["ColorPalette"].colorSelected, 
			tools["BrushSize"].brushSizeSelected
		);

		this.parentView.controlUpdate();
	}

	ToolPaint.prototype.processSelection = function()
	{
		this.parentView.toolSelected = this;
	}

	// controllable

	ToolPaint.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var returnValue = new ControlContainer
			(
				"containerPaint",
				[
					new ControlButton
					(
						this.name,
						this.processSelection.bind(this)
 					)
				]
			);

			this.control = returnValue;	
		}

		return this.control;
	}
}

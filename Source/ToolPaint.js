
class ToolPaint
{
	constructor()
	{
		this.name = "Paint";
	}

	// event handlers

	processMouseDown()
	{
		// do nothing
	}

	processMouseMove()
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

	processSelection()
	{
		this.parentView.toolSelected = this;
	}

	// controllable

	controlUpdate()
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

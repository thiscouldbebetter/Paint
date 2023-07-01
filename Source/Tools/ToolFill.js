
class ToolFill
{
	constructor()
	{
		this.name = "Fill";
	}

	// event handlers

	processSelection()
	{
		var tools = this.parentView.tools;

		var layerSelected = this.parentView.layerSelected();
		var display = layerSelected.display;
		var color = tools["ColorPalette"].colorSelected;
		var size = this.parentView.size;

		display.drawRectangle(Coords.Instances().Zeroes, size, color);

		this.parentView.controlUpdate();
	}

	// controllable

	controlUpdate()
	{
		if (this.control == null)
		{
			var returnValue = new ControlContainer
			(
				"containerFill",
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

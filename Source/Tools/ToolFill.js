
class ToolFill
{
	constructor()
	{
		this.name = ToolFill.Name();
	}

	static Name() { return "Fill"; }

	// event handlers

	processSelection()
	{
		var layerSelected = this.parentView.layerSelected();
		var display = layerSelected.display;
		var color = this.parentView.toolColorPalette().colorSelected;
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

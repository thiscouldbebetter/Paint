
class ToolFill extends Tool
{
	constructor()
	{
		super(ToolFill.Name() );
	}

	static Name(): string { return "Fill"; }

	// event handlers

	processSelection(): void
	{
		var layerSelected = this.parentView.layerSelected();
		var display = layerSelected.display;
		var color = this.parentView.toolColorPalette().colorSelected;
		var size = this.parentView.size;

		display.drawRectangle
		(
			Coords.Instances().Zeroes, size, color, null // ?
		);

		this.parentView.controlUpdate();
	}

	// controllable

	controlUpdate(): Control
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


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
		var view = this.parentView();
		var layerSelected = view.layerSelected();
		var display = layerSelected.display;
		var color = view.toolColorPalette().colorSelected;
		var size = view.size;

		display.drawRectangle
		(
			Coords.Instances().Zeroes, size, color, null // ?
		);

		view.controlUpdate();
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

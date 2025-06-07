
class ToolErase extends Tool
{
	constructor()
	{
		super(ToolErase.Name() );
	}

	static Name(): string { return "Erase"; }

	// event handlers

	processMouseDown(): void
	{
		// Do nothing.
	}

	processMouseMove(): void
	{
		var layerSelected = this.parentView.layerSelected();

		var layerSelectedOffset = layerSelected.offset;
		var posFrom = this.parentView.mousePosPrev.clone().subtract(layerSelectedOffset);
		var posTo = this.parentView.mousePos.clone().subtract(layerSelectedOffset);

		var toolBrushSize = this.parentView.toolBrushSize();

		layerSelected.display.clearLine
		(
			posFrom,
			posTo,
			toolBrushSize.brushSizeSelected
		);

		this.parentView.controlUpdate();
	}

	processSelection(): void
	{
		this.parentView.toolSelected = this;
	}

	// Controllable.

	controlUpdate(): Control
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


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
		var view = this.parentView();

		var layerSelected = view.layerSelected();

		var layerSelectedOffset = layerSelected.offset;
		var posFrom =
			view.mousePosPrev
				.clone()
				.subtract(layerSelectedOffset);
		var posTo =
			view.mousePos
				.clone()
				.subtract(layerSelectedOffset);

		var toolBrushSize = view.toolBrushSize();

		layerSelected.display.clearLine
		(
			posFrom,
			posTo,
			toolBrushSize.brushSizeSelected
		);

		view.controlUpdate();
	}

	processSelection(): void
	{
		this.parentView().toolSelect(this);
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

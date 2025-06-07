
class ToolViewSize extends Tool
{
	constructor()
	{
		super(ToolViewSize.Name() );
	}

	static Name(): string { return "ViewSize"; }

	// event handlers

	viewSizeXChanged(valueToSet: number): void
	{
		this.parentView.size.x = valueToSet;
		this.viewSizeSet();
	}

	viewSizeYChanged(valueToSet: number): void
	{
		this.parentView.size.y = valueToSet;
		this.viewSizeSet();
	}

	viewSizeSet(): void
	{
		var size = this.parentView.size;

		var layers = this.parentView.layers;

		var control = this.parentView.control as ControlContainer;
		var viewCanvas = control.childByName("viewCanvas") as ControlCanvas;
		var displayMain = viewCanvas.display;
		displayMain.sizeSet(size);

		for (var i = 0; i < layers.length; i++)
		{
			var layer = layers[i];
			layer.display.sizeSet(size);
			displayMain.drawOther
			(
				layer.display, Coords.Instances().Zeroes,
				null, null // ?
			);
		}
	}

	// control

	controlUpdate(): Control
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
						this.viewSizeXChanged.bind(this),
						null // max
					),

					new ControlNumberBox
					(
						"numberViewSizeY",
						size.y,
						this.viewSizeYChanged.bind(this),
						null // max
					),
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}

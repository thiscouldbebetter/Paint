
class ToolBrushSize
{
	constructor()
	{
		this.name = "BrushSize";
		this.brushSizeSelected = 1;
	}

	brushSizeSet(valueToSet)
	{
		this.brushSizeSelected = valueToSet;
	}

	controlUpdate()
	{
		if (this.control == null)
		{
			var returnValue = new ControlContainer
			(
				"containerToolBrushSize",
				[
					new ControlLabel("Brush Size:"),
					new ControlNumberBox
					(
						null, // id
						this.brushSizeSelected, // value
						this.brushSizeSet.bind(this)
					),
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}


class ToolBrushSize
{
	constructor()
	{
		this.name = ToolBrushSize.Name();
		this.brushSizeSelected = 1;
	}

	static Name() { return "BrushSize"; }

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

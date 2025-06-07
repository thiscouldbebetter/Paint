
class ToolBrushSize extends Tool
{
	brushSizeSelected: number;

	constructor()
	{
		super(ToolBrushSize.Name() );
		this.brushSizeSelected = 1;
	}

	static Name(): string { return "BrushSize"; }

	brushSizeSet(valueToSet: number): void
	{
		this.brushSizeSelected = valueToSet;
	}

	controlUpdate(): Control
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
						this.brushSizeSet.bind(this),
						null // max?
					),
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}


class ToolColorPalette
{
	constructor()
	{
		this.name = "ColorPalette";
		this.colorSelected = Color.Instances().Black;
	}

	// event handlers

	colorSetByName(colorName)
	{
		this.colorSelected = Color.Instances()._All[colorName];
	}

	// controllable

	controlUpdate()
	{
		if (this.control == null)
		{
			var colors = Color.Instances()._All;

			var returnValue = new ControlContainer
			(
				"containerToolColorPalette",
				[
					new ControlLabel("Color:"),
					new ControlSelectBox
					(
						"selectColor",
						colors,
						"name",
						this.colorSetByName.bind(this)
					),
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}

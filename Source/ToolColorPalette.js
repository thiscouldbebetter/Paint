
function ToolColorPalette()
{
	this.name = "ColorPalette";
	this.colorSelected = Color.Instances.Black;
}

{
	// event handlers

	ToolColorPalette.prototype.colorSetByName = function(colorName)
	{
		this.colorSelected = Color.Instances._All[colorName];
	}

	// controllable

	ToolColorPalette.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var colors = Color.Instances._All;

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

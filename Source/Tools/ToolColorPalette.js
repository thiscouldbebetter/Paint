
class ToolColorPalette
{
	constructor()
	{
		this.name = ToolColorPalette.Name();
		this.colors = Color.Instances()._All;
		this.colorSelected = this.colors[0];
	}

	static Name() { return "ColorPalette" };

	// event handlers

	/*
	colorAdd()
	{
		var name = this.control.childByName("textName").value;
		if (name != "")
		{
			var red = this.control.childByName("numberRed").value;
			var green = this.control.childByName("numberGreen").value;
			var blue = this.control.childByName("numberBlue").value;

			var components = [red, green, blue];
			var systemColor = "rgb(" + components.join(", ") + ")"
			var color = new Color(colorName, systemColor);
			this.colors.push(color);
			this.colorSelected = color;

			this.controlReset();
		}
	}
	*/

	colorByName(name)
	{
		return this.colors.find(x => x.name == name);
	}

	colorSelectByName(colorName)
	{
		this.colorSelected = this.colorByName(colorName);
	}

	/*
	colorSelectedDelete()
	{
		var colorSelectedIndex = this.colors.indexOf(this.colorSelected);
		if (colorSelectedIndex >= 0)
		{
			this.colors.splice(colorSelectedIndex, 1);
			this.colorSelectByName(this.colors[0]).name;
			this.parentView.controlUpdate();
		}
	}
	*/

	// controllable

	controlUpdate()
	{
		if (this.control == null)
		{
			var componentMax = 255;

			var returnValue = new ControlContainer
			(
				"containerToolColorPalette",
				[
					new ControlLabel("Color:"),
					new ControlSelectBox
					(
						"selectColor",
						this.colors,
						"name",
						this.colorSelectByName.bind(this)
					),

					/*
					new ControlButton
					(
						"Delete",
						this.colorSelectedDelete.bind(this)
 					),

					new ControlButton
					(
						"Add New with:",
						this.colorAdd.bind(this)
 					),

					new ControlLabel("Name:"),
					new ControlTextBox
					(
						"textName", ""
					),

					new ControlLabel("Red:"),
					new ControlNumberBox
					(
						"numberRed", // id
						0, // value
						null, // set
						componentMax
					),

					new ControlLabel("Green:"),
					new ControlNumberBox
					(
						"numberGreen", // id
						0, // value
						null, // set
						componentMax
					),

					new ControlLabel("Blue:"),
					new ControlNumberBox
					(
						"numberBlue", // id
						0, // value
						null, // set
						componentMax
					)
					*/
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}

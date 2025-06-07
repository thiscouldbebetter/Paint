
class ToolColorPalette extends Tool
{
	colors: Color[];
	colorSelected: Color;

	constructor()
	{
		super(ToolColorPalette.Name() );
		this.colors = Color.Instances()._All;
		this.colorSelected = this.colors[0];
	}

	static Name(): string { return "ColorPalette" };

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

	colorByName(name: string): Color
	{
		return this.colors.find(x => x.name == name);
	}

	colorNameChanged(): void
	{
		var control = this.control as ControlContainer;
		var textName = control.childByName("textName") as ControlTextBox;
		var nameToSet = textName.value;
		var colorSelected = this.colorSelected;
		colorSelected.name = nameToSet;
		this.colorSelect(colorSelected);
	}

	colorSelect(colorToSelect: Color): void
	{
		this.colorSelected = colorToSelect;

		var control = this.control as ControlContainer;
		var textName = control.childByName("textName") as ControlTextBox;
		var numberRed = control.childByName("numberRed") as ControlNumberBox;
		var numberGreen = control.childByName("numberGreen") as ControlNumberBox;
		var numberBlue = control.childByName("numberBlue") as ControlNumberBox;

		textName.value = colorToSelect.name;
		numberRed.value = colorToSelect.componentRed();
		numberGreen.value = colorToSelect.componentGreen();
		numberBlue.value = colorToSelect.componentBlue();

		this.control.domElementUpdate();
	}

	colorSelectByName(colorName: string): void
	{
		var colorToSelect = this.colorByName(colorName);
		this.colorSelect(colorToSelect);
	}

	colorSetFromControls(): void
	{
		var control = this.control as ControlContainer;
		var textName = control.childByName("textName") as ControlTextBox;
		var numberRed = control.childByName("numberRed") as ControlNumberBox;
		var numberGreen = control.childByName("numberGreen") as ControlNumberBox;
		var numberBlue = control.childByName("numberBlue") as ControlNumberBox;

		var colorSelected = this.colorSelected;

		colorSelected.overwriteWithNameAndComponentsRgb
		(
			textName.value,
			numberRed.value,
			numberGreen.value,
			numberBlue.value
		);

		this.colorSelect(colorSelected);
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

	controlUpdate(): Control
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
					*/

					new ControlLabel("Name:"),
					new ControlTextBox
					(
						"textName",
						"[custom]",
						this.colorNameChanged.bind(this)
					),

					new ControlLabel("Red:"),
					new ControlNumberBox
					(
						"numberRed", // id
						0, // value
						this.colorSetFromControls.bind(this),
						componentMax
					),
					new ControlLabel("/255"),

					new ControlLabel("Green:"),
					new ControlNumberBox
					(
						"numberGreen", // id
						0, // value
						this.colorSetFromControls.bind(this),
						componentMax
					),
					new ControlLabel("/255"),

					new ControlLabel("Blue:"),
					new ControlNumberBox
					(
						"numberBlue", // id
						0, // value
						this.colorSetFromControls.bind(this),
						componentMax
					),
					new ControlLabel("/255")
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}
}

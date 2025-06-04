
class Color
{
	constructor(name, componentsRgb)
	{
		this.name = name;
		this.componentsRgb = componentsRgb;
	}

	static Instances()
	{
		if (Color._instances == null)
		{
			Color._instances = new Color_Instances();
		}
		return Color._instances;
	}

	static byName(name)
	{
		return Color.Instances().byName(name);
	}

	componentRed()
	{
		return this.componentsRgb[0];
	}

	componentRedSet(value)
	{
		this.componentsRgb[0] = value;
		this.systemColorClear();
		return this;
	}

	componentGreen()
	{
		return this.componentsRgb[1];
	}

	componentGreenSet(value)
	{
		this.componentsRgb[1] = value;
		this.systemColorClear();
		return this;
	}

	componentBlue()
	{
		return this.componentsRgb[2];
	}

	componentBlueSet(value)
	{
		this.componentsRgb[2] = value;
		this.systemColorClear();
		return this;
	}

	overwriteWithNameAndComponentsRgb(name, red, green, blue)
	{
		this.name = name;
		this.componentRedSet(red);
		this.componentGreenSet(green);
		this.componentBlueSet(blue);
		return this;
	}

	systemColor()
	{
		if (this._systemColor == null)
		{
			this._systemColor =
				"rgb("
				+ this.componentsRgb.join(",")
				+ ")";
		}

		return this._systemColor;
	}

	systemColorClear()
	{
		this._systemColor = null;
		return this;
	}
}

class Color_Instances
{
	constructor()
	{
		this.Black 		= new Color("Black", 		[0, 0, 0]);
		this.Blue 		= new Color("Blue", 		[0, 0, 255]);
		this.Cyan		= new Color("Cyan", 		[0, 255, 255]);
		this.Gray		= new Color("Gray", 		[128, 128, 128]);
		this.GrayDark	= new Color("GrayDark", 	[64, 64, 64]);
		this.GrayLight 	= new Color("GrayLight", 	[192, 192, 192]);
		this.Green		= new Color("Green", 		[0, 255, 0]);
		this.Orange		= new Color("Orange", 		[255, 128, 0]);
		this.Red 		= new Color("Red", 			[255, 0, 0]);
		this.Violet		= new Color("Violet", 		[255, 0, 255]);
		this.White 		= new Color("White", 		[255, 255, 255]);
		this.Yellow		= new Color("Yellow", 		[255, 255, 0]);

		this._All =
		[
			this.Black,
			this.GrayDark,
			this.Gray,
			this.GrayLight,
			this.White,

			this.Red,
			this.Orange,
			this.Yellow,
			this.Green,
			this.Cyan,
			this.Blue,
			this.Violet
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}


class Color
{
	name: string;
	componentsRgb: number[];

	constructor(name: string, componentsRgb: number[])
	{
		this.name = name;
		this.componentsRgb = componentsRgb;
	}

	static _instances: Color_Instances;
	static Instances(): Color_Instances
	{
		if (Color._instances == null)
		{
			Color._instances = new Color_Instances();
		}
		return Color._instances;
	}

	static byName(name: string): Color
	{
		return Color.Instances().byName(name);
	}

	componentRed(): number
	{
		return this.componentsRgb[0];
	}

	componentRedSet(value: number): Color
	{
		this.componentsRgb[0] = value;
		this.systemColorClear();
		return this;
	}

	componentGreen(): number
	{
		return this.componentsRgb[1];
	}

	componentGreenSet(value: number): Color
	{
		this.componentsRgb[1] = value;
		this.systemColorClear();
		return this;
	}

	componentBlue(): number
	{
		return this.componentsRgb[2];
	}

	componentBlueSet(value: number): Color
	{
		this.componentsRgb[2] = value;
		this.systemColorClear();
		return this;
	}

	overwriteWithNameAndComponentsRgb
	(
		name: string, red: number, green: number, blue: number
	): Color
	{
		this.name = name;
		this.componentRedSet(red);
		this.componentGreenSet(green);
		this.componentBlueSet(blue);
		return this;
	}

	private _systemColor: string;
	systemColor(): string
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

	systemColorClear(): Color
	{
		this._systemColor = null;
		return this;
	}
}

class Color_Instances
{
	Black: Color;
	Blue: Color;
	Cyan: Color;
	Gray: Color;
	GrayDark: Color;
	GrayLight: Color;
	Green: Color;
	Orange: Color;
	Red: Color;
	Violet: Color;
	White: Color;
	Yellow: Color;

	_All: Color[];
	_AllByName: Map<string, Color>;

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

	byName(name: string): Color
	{
		return this._AllByName.get(name);
	}
}

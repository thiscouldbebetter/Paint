
function Color(name, systemColor)
{
	this.name = name;
	this.systemColor = systemColor;
}

{
	Color.Instances = new Color_Instances();

	function Color_Instances()
	{
		this.Black 	= new Color("Black", "Black");
		this.Blue 	= new Color("Blue", "Blue");
		this.Cyan	= new Color("Cyan", "Cyan");
		this.Gray	= new Color("Gray", "Gray");
		this.GrayDark	= new Color("GrayDark", "DarkGray");
		this.GrayLight 	= new Color("GrayLight", "LightGray");
		this.Green	= new Color("Green", "Green");
		this.Orange	= new Color("Orange", "Orange");
		this.Red 	= new Color("Red", "Red");
		this.Violet	= new Color("Violet", "Violet");
		this.White 	= new Color("White", "White");
		this.Yellow	= new Color("Yellow", "Yellow");

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

		this._All.addLookups("name");
	}
}

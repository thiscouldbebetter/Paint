
class Layer
{
	name: string;
	size: Coords;
	offset: Coords;

	isVisible: boolean;

	display: Display;
	parentView: View;

	constructor(name: string, size: Coords, offset: Coords)
	{
		this.name = name;
		this.size = size;
		this.offset = offset;

		this.isVisible = true;

		this.display = new Display(size);
		this.display.initialize();
	}
}

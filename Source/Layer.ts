
class Layer
{
	name: string;
	size: Coords;
	offset: Coords;

	isVisible: boolean;

	display: Display;
	_parentView: View;

	constructor(name: string, size: Coords, offset: Coords)
	{
		this.name = name;
		this.size = size;
		this.offset = offset;

		this.isVisible = true;

		this.display = new Display(size);
		this.display.initialize();
	}

	static fromNameAndSize(name: string, size: Coords): Layer
	{
		return new Layer(name, size, Coords.zeroes() );
	}

	parentView(): View
	{
		return this._parentView;
	}

	parentViewSet(value: View): Layer
	{
		this._parentView = value;
		return this;
	}
}

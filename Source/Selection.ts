
class Selection_
{
	pos: Coords;
	size: Coords;

	isBeingMoved: boolean;
	isComplete: boolean;

	private _max: Coords;
	color: Color

	constructor(pos: Coords, size: Coords)
	{
		this.pos = pos;
		this.size = size;

		this._max = Coords.create();

		this.color = Color.Instances().Cyan; // todo
	}

	static create(): Selection_
	{
		return new Selection_(Coords.create(), Coords.create());
	}

	drawToDisplay(display: Display): void
	{
		display.drawRectangle(this.pos, this.size, null, this.color);
	}

	max(): Coords
	{
		return this._max.overwriteWith(this.pos).add(this.size);
	}
}

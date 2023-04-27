
class Selection
{
	constructor(pos, size)
	{
		this.pos = pos;
		this.size = size;
		this._max = new Coords();

		this.color = Color.Instances().Cyan; // todo
	}

	drawToDisplay(display)
	{
		display.drawRectangle(this.pos, this.size, null, this.color);
	}

	max()
	{
		return this._max.overwriteWith(this.pos).add(this.size);
	}
}

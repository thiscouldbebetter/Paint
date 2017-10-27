
function Selection(pos, size)
{
	this.pos = pos;
	this.size = size;
	this._max = new Coords();

	this.color = Color.Instances.Cyan; // todo
}

{
	Selection.prototype.drawToDisplay = function(display)
	{
		display.drawRectangle(this.pos, this.size, null, this.color);
	}

	Selection.prototype.max = function()
	{
		return this._max.overwriteWith(this.pos).add(this.size);
	}	
}


function Coords(x, y)
{
	this.x = x;
	this.y = y;	
}

{
	// instances

	Coords.Instances = new Coords_Instances();

	function Coords_Instances()
	{
		this.Zeroes = new Coords(0, 0);
	}

	// methods

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	
	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	Coords.prototype.isInRangeMinMax = function(min, max)
	{
		var returnValue = 
		(
			this.x >= min.x
			&& this.x <= max.x
			&& this.y >= min.y
			&& this.y >= max.y
		);

		return returnValue;
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	Coords.prototype.overwriteWithDimensions = function(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	Coords.prototype.toString = function()
	{
		return "(" + this.x + "," + this.y + ")";
	}
}

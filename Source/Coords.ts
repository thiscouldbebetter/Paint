
class Coords
{
	x: number;
	y: number;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	static create(): Coords
	{
		return new Coords(0, 0);
	}

	static ones(): Coords
	{
		return new Coords(1, 1);
	}

	static zeroes(): Coords
	{
		return new Coords(0, 0);
	}

	// instances

	static _instances: Coords_Instances;
	static Instances(): Coords_Instances
	{
		if (Coords._instances == null)
		{
			Coords._instances = new Coords_Instances();
		}
		return Coords._instances;
	}

	// methods

	add(other: Coords): Coords
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	clone(): Coords
	{
		return new Coords(this.x, this.y);
	}

	divide(other: Coords): Coords
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	divideScalar(scalar: number): Coords
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	isInRangeMinMax(min: Coords, max: Coords): boolean
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

	magnitude(): number
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiply(other: Coords): Coords
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar: number): Coords
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	overwriteWith(other: Coords): Coords
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	overwriteWithDimensions(x: number, y: number): Coords
	{
		this.x = x;
		this.y = y;
		return this;
	}

	subtract(other: Coords): Coords
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	toString(): string
	{
		return "(" + this.x + "," + this.y + ")";
	}
}

class Coords_Instances
{
	Zeroes: Coords;

	constructor()
	{
		this.Zeroes = Coords.zeroes();
	}
}

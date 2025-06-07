
class Tool implements Controllable
{
	name: string;
	parentView: View;

	constructor(name: string)
	{
		this.name = name;
	}

	// Controllable.
	control: Control;
	controlUpdate(): Control
	{
		throw new Error("Must be implemented in subclass.");
	}

	processMouseDown(): void
	{
		throw new Error("Must be implemented in subclass.");
	}

	processMouseMove(): void
	{
		throw new Error("Must be implemented in subclass.");
	}

	processSelection(): void
	{
		throw new Error("Must be implemented in subclass.");
	}

}

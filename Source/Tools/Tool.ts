
class Tool implements Controllable
{
	name: string;
	_parentView: View;

	constructor(name: string)
	{
		this.name = name;
	}

	parentView(): View
	{
		return this._parentView;
	}

	parentViewSet(value: View): Tool
	{
		this._parentView = value;
		return this;
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

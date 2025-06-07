
class Control
{
	name: string;

	constructor(name: string)
	{
		this.name = name;
	}

	static controllablesToControls(controllables: Controllable[])
	{
		var returnValues = [];

		for (var i = 0; i < controllables.length; i++)
		{
			var controllable = controllables[i];
			var control = controllable.controlUpdate();
			returnValues.push(control);
		}

		return returnValues;
	}

	domElement: any;

	domElementUpdate(): any
	{
		throw new Error("Must be implemented in subclass.");
	}

	handleEventClick(event: any): void
	{
		throw new Error("Must be implemented in subclass.");
	}

}

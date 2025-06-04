
class ControlNumberBox
{
	constructor(name, value, change, max)
	{
		this.name = name;
		this.value = value;
		this.change = change;
		this.max = max;
	}

	// dom

	domElementUpdate()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("input");
			returnValue.type = "number"
			returnValue.id = this.name;
			returnValue.min = 0;
			returnValue.style.width = "64px"; // hack
			returnValue.onchange = this.handleEventChanged.bind(this);

			if (this.max != null)
			{
				returnValue.max = this.max;
			}

			this.domElement = returnValue;
		}

		this.domElement.value = this.value;

		return this.domElement;
	}

	// events

	handleEventChanged(event)
	{
		var valueAsInt = parseInt(event.target.value);
		this.value = valueAsInt;

		if (this.change != null)
		{
			this.change(event.target.value);
		}
	}
}

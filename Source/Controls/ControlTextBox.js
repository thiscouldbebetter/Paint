
class ControlTextBox
{
	constructor(name, value, change)
	{
		this.name = name;
		this.value = value;
		this.change = change;
	}

	// dom

	domElementUpdate()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("input");
			returnValue.id = this.name;
			returnValue.onchange = this.handleEventValueChanged.bind(this);

			this.domElement = returnValue;
		}

		this.domElement.value = this.value;

		return this.domElement;
	}

	handleEventValueChanged(event)
	{
		this.value = event.target.value;

		if (this.change != null)
		{
			this.change(event.target.value);
		}
	}
}

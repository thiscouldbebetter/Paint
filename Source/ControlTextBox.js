
function ControlTextBox(name, value, change)
{
	this.name = name;
	this.value = value;
	this.change = change;
}

{
	// dom

	ControlTextBox.prototype.domElementUpdate = function()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("input");
			returnValue.id = this.name;
			returnValue.value = this.value;
			returnValue.onchange = this.handleEventValueChanged.bind(this);

			this.domElement = returnValue;
		}

		return this.domElement;
	}

	ControlTextBox.prototype.handleEventValueChanged = function(event)
	{
		this.value = event.target.value;

		if (this.change != null)
		{
			this.change(event.target.value);
		}
	}
}

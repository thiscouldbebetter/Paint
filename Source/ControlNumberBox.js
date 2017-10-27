

function ControlNumberBox(name, value, change)
{
	this.name = name;
	this.value = value;
	this.change = change;
}

{
	// dom

	ControlNumberBox.prototype.domElementUpdate = function()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("input");
			returnValue.type = "number"
			returnValue.id = this.name;
			returnValue.style.width = "64px"; // hack
			returnValue.onchange = this.handleEventChanged.bind(this);
			returnValue.value = this.value;

			this.domElement = returnValue;
		}

		return this.domElement;
	}

	// events

	ControlNumberBox.prototype.handleEventChanged = function(event)
	{
		var valueAsInt = parseInt(event.target.value);
		this.value = valueAsInt;

		if (this.change != null)
		{
			this.change(event.target.value);
		}
	}
}

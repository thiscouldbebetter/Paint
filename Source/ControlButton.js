
function ControlButton(text, click)
{
	this.text = text;
	this.click = click;
}

{
	// dom

	ControlButton.prototype.domElementUpdate = function()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("button");
			returnValue.innerHTML = this.text;
			returnValue.onclick = this.handleEventClick.bind(this);
			this.domElement = returnValue;
		}

		return this.domElement;
	}

	// event handlers

	ControlButton.prototype.handleEventClick = function(event)
	{
		this.click();
	}
}

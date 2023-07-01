
class ControlButton
{
	constructor(text, click)
	{
		this.text = text;
		this.click = click;
	}

	// dom

	domElementUpdate()
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

	handleEventClick(event)
	{
		this.click();
	}
}

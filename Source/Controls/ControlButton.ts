
class ControlButton extends Control
{
	text: string;
	click: any;

	constructor(text: string, click: any)
	{
		super("button" + text);

		this.text = text;
		this.click = click;
	}

	// dom

	domElementUpdate(): any
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

	handleEventClick(event: any): void
	{
		this.click();
	}
}

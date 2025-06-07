
class ControlLabel extends Control
{
	text: string;

	constructor(text: string)
	{
		super("label" + text);

		this.text = text;
	}

	// dom

	domElementUpdate(): any
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("label");
			returnValue.innerHTML = this.text;

			this.domElement = returnValue;
		}

		return this.domElement;
	}

}

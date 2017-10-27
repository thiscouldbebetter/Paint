
function ControlLabel(text)
{
	this.text = text;
}

{
	// dom

	ControlLabel.prototype.domElementUpdate = function()
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

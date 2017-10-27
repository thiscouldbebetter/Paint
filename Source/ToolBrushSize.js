
function ToolBrushSize()
{
	this.name = "BrushSize";
	this.brushSizeSelected = 1;
}

{
	ToolBrushSize.prototype.brushSizeSet = function(valueToSet)
	{
		this.brushSizeSelected = valueToSet;
	}

	ToolBrushSize.prototype.controlUpdate = function()
	{		
		if (this.control == null)
		{
			var returnValue = new ControlContainer
			(
				"containerToolBrushSize",
				[
					new ControlLabel("Brush Size:"),
					new ControlNumberBox
					(
						null, // id
						this.brushSizeSelected, // value
						this.brushSizeSet.bind(this)
					),
				]
			);

			this.control = returnValue;
		}

		return this.control;	
	}
}


function Control()
{
	// static class
}

{
	Control.controllablesToControls = function(controllables)
	{
		var returnValues = [];

		for (var i = 0; i < controllables.length; i++)
		{
			var controllable = controllables[i];
			var control = controllable.controlUpdate();
			returnValues.push(control);
		}

		return returnValues;
	}
}

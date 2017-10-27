
function ControlFileUploader(name, change)
{
	this.name = name;
	this.change = change;
}

{
	ControlFileUploader.prototype.domElementUpdate = function()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("input");
			returnValue.type = "file";
			returnValue.id = this.name;
			returnValue.onchange = this.handleEventChanged.bind(this);

			this.domElement = returnValue;
		}

		return this.domElement;
	}

	ControlFileUploader.prototype.handleEventChanged = function(event)
	{
		var fileToLoad = event.target.files[0];

		if (fileToLoad == null)
		{
			if (this.change != null)
			{
				this.change(null);
			}
		}
		else
		{
			var fileReader = new FileReader();
			fileReader.file = fileToLoad;
			fileReader.onload = this.handleEventChanged_FileLoaded.bind(this);
			fileReader.readAsBinaryString(fileToLoad);
		}
	}

	ControlFileUploader.prototype.handleEventChanged_FileLoaded = function(event)
	{
		var fileReader = event.target;
		var file = fileReader.file;
		var fileName = file.name;
		var fileType = file.type;
		var fileContentAsBinaryString = fileReader.result;

		var fileContentAsBytes = FileHelper.binaryStringToBytes
		(	
			fileContentAsBinaryString
		);

		if (this.change != null)
		{
			this.change(fileName, fileType, fileContentAsBytes);
		}

	}
}

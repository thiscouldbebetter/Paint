
class ControlFileUploader extends Control
{
	change: any;

	constructor(name: string, change: any)
	{
		super(name);

		this.name = name;
		this.change = change;
	}

	domElementUpdate(): any
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

	handleEventChanged(event: any): void
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
			fileReader.onload = this.handleEventChanged_FileLoaded.bind(this);
			fileReader.readAsBinaryString(fileToLoad);
		}
	}

	handleEventChanged_FileLoaded(event: any): void
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

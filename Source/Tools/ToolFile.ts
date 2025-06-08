
class ToolFile extends Tool
{
	fileNameToSaveAs: string;

	constructor()
	{
		super(ToolFile.Name() );
		this.fileNameToSaveAs = "Untitled";
	}

	static Name() { return "File"; }

	// event handlers

	processFileNameToSaveAsChange(value: string): void
	{
		this.fileNameToSaveAs = value;
	}

	processSaveAsPNG(event: any): void
	{
		var view = this.parentView();
		var control = view.control as ControlContainer;
		var controlCanvas =
			control.childByName("viewCanvas") as ControlCanvas;
		var canvas = controlCanvas.display.canvas;

		var imageFromCanvasURL =
			canvas.toDataURL("image/png");

		var imageAsByteString =
			atob(imageFromCanvasURL.split(',')[1]);
		var imageAsArrayBuffer =
			new ArrayBuffer(imageAsByteString.length);
		var imageAsArrayUnsigned =
			new Uint8Array(imageAsArrayBuffer);
		for (var i = 0; i < imageAsByteString.length; i++) 
		{
			imageAsArrayUnsigned[i] =
				imageAsByteString.charCodeAt(i);
		}

		var imageAsBlob = new Blob([imageAsArrayBuffer], {type:"image/png"});

		var fileNameToSaveAs = this.fileNameToSaveAs;
		if (fileNameToSaveAs.toLowerCase().endsWith(".png") == false)
		{
			fileNameToSaveAs += ".png";
		}

		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(imageAsBlob);
		link.download = fileNameToSaveAs;
		link.click();
	}

	processSaveAsTAR(event: any): void
	{
		var fileNameToSaveAs = this.fileNameToSaveAs;
		if (fileNameToSaveAs.toLowerCase().endsWith(".tar") == false)
		{
			fileNameToSaveAs += ".tar";
		}

		var layersAsTarFile = TarFile.fromName(fileNameToSaveAs);

		var view = this.parentView();
		var layers = view.layerGroup.layers();

		for (var i = 0; i < layers.length; i++)
		{
			var layer = layers[i];

			var canvas = layer.display.canvas;

			var layerAsDataURL = canvas.toDataURL("image/png");

			var layerAsBase64String = layerAsDataURL.split(',')[1];

			var layerAsBytes = Base64Encoder.base64StringToBytes
			(
				layerAsBase64String
			);

			var layerAsTarFileEntry = TarFileEntry.fileNew
			(
				layer.name + ".png",
				layerAsBytes
			);
			layersAsTarFile.entries.push(layerAsTarFileEntry);
		}

		layersAsTarFile.downloadAs(fileNameToSaveAs);
	}

	// controllable

	controlUpdate(): Control
	{
		if (this.control == null)
		{
			var containerSave = new ControlContainer
			(
				"containerSave",
				[
					new ControlLabel("Save As:"),

					new ControlTextBox
					(
						"textFileName", // id
						"Untitled",
						this.processFileNameToSaveAsChange.bind(this)
					),
					new ControlButton
					(
						"As PNG",
						this.processSaveAsPNG.bind(this)
					),

					new ControlButton
					(
						"As TAR",
						this.processSaveAsTAR.bind(this)
					),
				]
			);

			var containerLoad = new ControlContainer
			(
				"containerLoad",
				[
					new ControlLabel("Load:"),
					new ControlFileUploader
					(
						"fileToLoad", 
						this.fileToUploadChanged.bind(this)
					),
				]
			);

			var returnValue = new ControlContainer
			(
				"containerToolFile",
				[
					containerSave,
					containerLoad,
				]
			);

			this.control = returnValue;
		}

		return this.control;
	}

	fileToUploadChanged
	(
		fileName: string, fileType: string, fileContentAsBytes: number[]
	): void
	{
		if (fileContentAsBytes != null)
		{
			if (fileType == "image/png")
			{
				this.layerAddFromPNGAsBytes(fileContentAsBytes);
			}
			else if (fileType == "application/x-tar")
			{
				var tarFile = TarFile.fromNameAndBytes
				(
					fileName, fileContentAsBytes
				);
				var tarFileEntries = tarFile.entries;
				for (var i = 0; i < tarFileEntries.length; i++)
				{
					var entry = tarFileEntries[i];
					var entryDataAsBytes = entry.dataAsBytes;
	
					this.layerAddFromPNGAsBytes(entryDataAsBytes);
				}
			}
			else
			{
				alert("Unrecognized file type!");
			}
		}
	}

	layerAddFromPNGAsBytes(fileContentAsBytes: number[]): void
	{
		var imageLoadedAsImgElement = document.createElement("img");
		imageLoadedAsImgElement.onload = (event) =>
		{
			var imageSize = new Coords
			(
				imageLoadedAsImgElement.width,
				imageLoadedAsImgElement.height
			);
			var imageLoadedAsDisplay = new Display(imageSize);
			imageLoadedAsDisplay.initialize();
			var graphics = imageLoadedAsDisplay.canvas.getContext("2d");
			graphics.drawImage(imageLoadedAsImgElement, 0, 0);

			var view = this.parentView();
			var toolLayers = view.toolLayers();
			toolLayers.layerAddNew();
			var layerNew = view.layerSelected();
			layerNew.display.drawOther
			(
				imageLoadedAsDisplay, new Coords(0, 0),
				null, null // ?
			);
			view.controlUpdate();
		}

		var fileContentAsBase64 = 
			Base64Encoder.bytesToBase64String(fileContentAsBytes);

		var dataURL = "data:image/png;base64," + fileContentAsBase64;

		imageLoadedAsImgElement.src = dataURL;
	}
}

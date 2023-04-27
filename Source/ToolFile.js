
class ToolFile
{
	constructor()
	{
		this.name = "FileSave";
		this.fileNameToSaveAs = "Untitled";
	}

	// event handlers

	processFileNameToSaveAsChange(event)
	{
		this.fileNameToSaveAs = event.target.value;
	}

	processSaveAsPNG(event)
	{
		var canvas = this.parentView.control.children["viewCanvas"].display.canvas;

		var imageFromCanvasURL = canvas.toDataURL("image/png");

		var imageAsByteString = atob(imageFromCanvasURL.split(',')[1]);
		var imageAsArrayBuffer = new ArrayBuffer(imageAsByteString.length);
		var imageAsArrayUnsigned = new Uint8Array(imageAsArrayBuffer);
		for (var i = 0; i < imageAsByteString.length; i++) 
		{
			imageAsArrayUnsigned[i] = imageAsByteString.charCodeAt(i);
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

	processSaveAsTAR(event)
	{
		var fileNameToSaveAs = this.fileNameToSaveAs;
		if (fileNameToSaveAs.toLowerCase().endsWith(".tar") == false)
		{
			fileNameToSaveAs += ".tar";
		}

		var layersAsTarFile = TarFile.new(fileNameToSaveAs);

		var layers = this.parentView.layers;

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

	controlUpdate()
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

	fileToUploadChanged(fileName, fileType, fileContentAsBytes)
	{
		if (fileContentAsBytes != null)
		{
			if (fileType == "image/png")
			{
				this.layerAddFromPNGAsBytes(fileContentAsBytes);
			}
			else if (fileType == "application/x-tar")
			{
				var tarFile = TarFile.fromBytes(fileName, fileContentAsBytes);
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

	layerAddFromPNGAsBytes(fileContentAsBytes)
	{
		var fileContentAsBase64 = 
			Base64Encoder.bytesToBase64String(fileContentAsBytes);

		var dataURL = "data:image/png;base64," + fileContentAsBase64;

		var imageLoadedAsImgElement = document.createElement("img");
		imageLoadedAsImgElement.src = dataURL;
		var imageSize = new Coords
		(
			imageLoadedAsImgElement.width,
			imageLoadedAsImgElement.height
		);
		var imageLoadedAsDisplay = new Display(imageSize);
		imageLoadedAsDisplay.initialize();
		var graphics = imageLoadedAsDisplay.canvas.getContext("2d");
		graphics.drawImage(imageLoadedAsImgElement, 0, 0);

		var view = this.parentView;
		var toolLayers = view.tools["Layers"];
		toolLayers.layerAdd();
		var layerNew = view.layerSelected();
		layerNew.display.drawOther
		(
			imageLoadedAsDisplay, new Coords(0, 0)
		);
		view.controlUpdate();
	}
}

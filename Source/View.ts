
class View
{
	size: Coords;
	tools: Tool[];

	toolSelected: Tool;
	layers: Layer[];
	selection: Selection_;

	isMouseDown: boolean;
	mousePos: Coords;
	mousePosPrev: Coords;

	constructor
	(
		size: Coords,
		toolNameToSelectInitial: string,
		tools: Tool[]
	)
	{
		this.size = size;
		this.tools = tools;

		for (var i = 0; i < this.tools.length; i++)
		{
			var tool = this.tools[i];
			tool.parentView = this;
		}

		this.toolSelected = this.toolByName(toolNameToSelectInitial);

		this.layers = 
		[
			new Layer("Layer0", size, new Coords(0, 0)),
		];

		for (var i = 0; i < this.layers.length; i++)
		{
			var layer = this.layers[i];
			layer.parentView = this;
		}

		this.isMouseDown = false;
		this.mousePos = new Coords(0, 0);
		this.mousePosPrev = new Coords(0, 0);

		this.selection = Selection_.create();
	}

	// static methods

	static imageURLForAlphaZeroBuild(): string
	{
		var imageSizeInPixels = new Coords(32, 32);
		var imageSizeInPixelsHalf = imageSizeInPixels.clone().divideScalar(2);

		var canvas = document.createElement("canvas");
		canvas.width = imageSizeInPixels.x;
		canvas.height = imageSizeInPixels.y;

		var graphicsForCanvas = canvas.getContext("2d");

		var colors = Color.Instances();

		graphicsForCanvas.fillStyle =
			colors.Gray.systemColor();
		graphicsForCanvas.fillRect
		(
			0, 0, imageSizeInPixels.x, imageSizeInPixels.y
		);
		graphicsForCanvas.fillStyle =
			colors.GrayLight.systemColor();
		graphicsForCanvas.fillRect
		(
			0, 0, imageSizeInPixelsHalf.x, imageSizeInPixelsHalf.y
		);
		graphicsForCanvas.fillRect
		(
			imageSizeInPixelsHalf.x, 
			imageSizeInPixelsHalf.y, 
			imageSizeInPixelsHalf.x, 
			imageSizeInPixelsHalf.y
		);

		var imageFromCanvasURL = canvas.toDataURL("image/png");

		return imageFromCanvasURL;
	}

	// instance methods

	layerSelected(): Layer
	{
		var layerIndexSelected = this.toolLayers().layerIndexSelected;
		var returnValue = this.layers[layerIndexSelected]; 
		return returnValue;
	}

	toolByName(name: string): Tool
	{
		return this.tools.find(x => x.name == name);
	}

	// Tools.

	toolBrushSize(): ToolBrushSize
	{
		return this.toolByName(ToolBrushSize.Name() ) as unknown as ToolBrushSize;
	}

	toolColorPalette(): ToolColorPalette
	{
		return this.toolByName(ToolColorPalette.Name() ) as unknown as ToolColorPalette;
	}

	toolFile(): ToolFile
	{
		return this.toolByName(ToolFile.Name() ) as unknown as ToolFile;
	}

	toolFill(): ToolFill
	{
		return this.toolByName(ToolFill.Name() ) as unknown as ToolFill;
	}

	toolLayers(): ToolLayers
	{
		return this.toolByName(ToolLayers.Name() ) as unknown as ToolLayers;
	}

	toolPaint(): ToolPaint
	{
		return this.toolByName(ToolPaint.Name() ) as unknown as ToolPaint;
	}

	toolSelect(): ToolSelect
	{
		return this.toolByName(ToolSelect.Name() ) as unknown as ToolSelect;
	}

	toolViewSize(): ToolViewSize
	{
		return this.toolByName(ToolViewSize.Name() ) as unknown as ToolViewSize;
	}

	// Event handlers.

	processMouseDown(event: any): void
	{
		event.preventDefault(); // otherwise the cursor changes

		var boundingClientRect = 
			event.target.getBoundingClientRect();
		this.mousePos.overwriteWithDimensions
		(
			event.clientX - boundingClientRect.left,
			event.clientY - boundingClientRect.top
		);
		this.mousePosPrev.overwriteWith(this.mousePos);
		this.isMouseDown = true;
		this.toolSelected.processMouseDown();
	}

	processMouseOver(event: any): void
	{
		// Do nothing.
	}

	processMouseOut(event: any): void
	{
		this.isMouseDown = false;
	}

	processMouseMove(event: any): void
	{
		if (this.isMouseDown)
		{
			this.mousePosPrev.overwriteWith(this.mousePos);
			var boundingClientRect = 
				event.target.getBoundingClientRect();
			this.mousePos.overwriteWithDimensions
			(
				event.clientX - boundingClientRect.left,
				event.clientY - boundingClientRect.top
			);
			this.toolSelected.processMouseMove();
		}
	}

	processMouseUp(event: any): void
	{
		this.isMouseDown = false;
	}

	// Controllable.

	control: Control;
	controlCanvas: ControlCanvas;

	controlUpdate(): Control
	{ 
		if (this.control == null)
		{
			this.controlCanvas = new ControlCanvas
			(
				"viewCanvas",
				this.size,
				this.layers,
				this.processMouseDown.bind(this),
				this.processMouseMove.bind(this),
				this.processMouseOut.bind(this),
				this.processMouseOver.bind(this),
				this.processMouseUp.bind(this)
			);

			var containerTools = new ControlContainer
			(
				"containerTools",
				Control.controllablesToControls(this.tools)
			);

			var containerView = new ControlContainer
			(
				"containerView",
				[
					this.controlCanvas,
					containerTools,
				]
			);

			this.control = containerView;
		}

		this.control.domElementUpdate();

		this.drawToDisplay(this.controlCanvas.display);

		return this.control;
	}

	// drawable

	drawToDisplay(display: Display): void
	{
		if (this.selection.pos != null)
		{
			display.drawRectangle
			(
				this.selection.pos,
				this.selection.size,
				null, // colorFill
				Color.Instances().Cyan // colorBorder
			);
		}
	}
}

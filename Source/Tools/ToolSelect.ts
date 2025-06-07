
class ToolSelect extends Tool
{
	layerForClipboard: Layer;

	constructor()
	{
		super(ToolSelect.Name() );
	}

	static Name(): string { return "Select"; }

	// event handlers

	copy(): void
	{
		this.copyOrCut(false);
	}

	cut(): void
	{
		this.copyOrCut(true);
	}

	copyOrCut(cutRatherThanCopy: boolean): void
	{
		var view = this.parentView;
		var layerSelected = view.layerSelected();
		var selection = view.selection;
		var layerForClipboard = new Layer
		(
			"layerClipboard",
			selection.size.clone(),
			new Coords(0, 0) // offset
		);

		layerForClipboard.display.drawOther
		(
			layerSelected.display, 
			new Coords(0, 0), // target pos
			selection.pos,
			selection.size
		);

		if (cutRatherThanCopy == true)
		{
			layerSelected.display.clearRectangle
			(
				selection.pos.clone().subtract
				(
					layerSelected.offset
				),
				selection.size
			);
		}

		selection.pos = null;

		this.layerForClipboard = layerForClipboard;

		view.controlUpdate();
	}

	paste(): void
	{
		var view = this.parentView;
		var layerForClipboard = this.layerForClipboard;
		if (layerForClipboard != null)
		{
			var layersAll = view.layers;
			layersAll.push(layerForClipboard);
			this.layerForClipboard = null;

			var toolLayers = view.toolLayers();
			toolLayers.layerIndexSelected = layersAll.length - 1;
			toolLayers.controlUpdate();

			view.controlUpdate();
		}
	}

	processMouseDown(): void
	{
		var selection = this.parentView.selection;
		var mousePos = this.parentView.mousePos;

		if (selection.pos == null)
		{
			selection.pos = mousePos.clone();
			selection.size = new Coords(0, 0);
			selection.isComplete = false;
			selection.isBeingMoved = false;
		}
		else if (mousePos.isInRangeMinMax(selection.pos, selection.max() ) )
		{
			selection.isBeingMoved = true;
		}
		else
		{
			selection.pos = null;
		}

		this.parentView.controlUpdate();
	}

	processMouseMove(): void
	{
		var selection = this.parentView.selection;

		if (selection.pos == null)
		{
			// do nothing
		}
		else if (selection.isComplete == false)
		{
			selection.size.overwriteWith
			(
				this.parentView.mousePos
			).subtract
			(
				selection.pos
			);
		}
		else if (selection.isBeingMoved == true)
		{
			var mousePos = this.parentView.mousePos;
			var mousePosPrev = this.parentView.mousePosPrev;
			var mouseMove = mousePos.clone().subtract(mousePosPrev);
			selection.pos.add(mouseMove);
		}

		this.parentView.controlUpdate();
	}

	processMouseUp(): void
	{
		var selection = this.parentView.selection;
		selection.isComplete = true;

		this.parentView.controlUpdate();
	}

	processSelection(): void
	{
		this.parentView.toolSelected = this;
	}

	// controllable

	controlUpdate(): Control
	{
		if (this.control == null)
		{
			var returnValue = new ControlContainer
			(
				"containerSelect",
				[
					new ControlButton
					(
						this.name,
						this.processSelection.bind(this)
		 			),
					new ControlButton
					(
						"Cut",
						this.cut.bind(this)
		 			),
					new ControlButton
					(
						"Copy",
						this.copy.bind(this)
		 			),
					new ControlButton
					(
						"Paste",
						this.paste.bind(this)
		 			),
				]
			);

			this.control = returnValue;	
		}

		return this.control;
	}
}

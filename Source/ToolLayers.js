

function ToolLayers()
{
	this.name = "Layers";
	this.layerIndexSelected = 0;
	this.moveStepDistance = 10;
}

{
	// event handlers

	ToolLayers.prototype.layerAdd = function()
	{
		var layersAll = this.parentView.layers;
		var layerNewIndex = layersAll.length;
		var layerNew = new Layer
		(
			"Layer" + layerNewIndex, 
			this.parentView.size.clone(),
			new Coords(0, 0) // offset
		);
		layerNew.parentView = this.parentView;
		layersAll.push(layerNew);
		layersAll[layerNew.name] = layerNew;

		this.layerIndexSelected = layerNewIndex;

		this.controlUpdate();
	}

	ToolLayers.prototype.layerClone = function()
	{
		var layerToClone = this.parentView.layerSelected();	
		var layersAll = this.parentView.layers;
		var layerClonedName = layerToClone + "_Clone";
		var layerNew = new Layer
		(
			layerClonedName,
			layerToClone.size.clone()
		);
		layerCloned.parentView = this.parentView;
		var layerClonedIndex = layersAll.indexOf(layerToClone) + 1;
		layersAll.splice(layerClonedIndex, 0, layerCloned);
		layersAll[layerCloned.name] = layerCloned;

		this.layerIndexSelected = layerClonedIndex;

		this.controlUpdate();
	}

	ToolLayers.prototype.layerSelectedHideOrShow = function()
	{
		var layerSelected = this.parentView.layerSelected();
		layerSelected.isVisible = (layerSelected.isVisible == false);
		this.controlUpdate();
		this.parentView.controlUpdate();
	}

	ToolLayers.prototype.layerSelectedLower = function(offset)
	{
		this.layerSelectedRaiseOrLower(-1);
	}

	ToolLayers.prototype.layerSelectedMergeDown = function()
	{
		var layerSelected = this.parentView.layerSelected();
		var layersAll = this.parentView.layers;
		var layerSelectedIndex = layersAll.indexOf(layerSelected);
		if (layerSelectedIndex > 0)
		{
			var layerUnderneathIndex = layerSelectedIndex - 1;
			var layerUnderneath = layersAll[layerUnderneathIndex];
			layerUnderneath.display.drawOther
			(
				layerSelected.display,
				layerSelected.offset.clone().subtract
				(
					layerUnderneath.offset
				)
			);
			this.layerSelectedRemove();
		}
	}

	ToolLayers.prototype.layerSelectedMove = function(direction)
	{
		var offset = direction.multiplyScalar(this.moveStepDistance);
		var layerSelected = this.parentView.layerSelected();
		layerSelected.offset.add(offset);
		this.parentView.controlUpdate();
	}

	ToolLayers.prototype.layerSelectedMoveDown = function()
	{
		this.layerSelectedMove(new Coords(0, 1));
	}

	ToolLayers.prototype.layerSelectedMoveLeft = function()
	{
		this.layerSelectedMove(new Coords(-1, 0));
	}

	ToolLayers.prototype.layerSelectedMoveRight = function()
	{
		this.layerSelectedMove(new Coords(1, 0));
	}

	ToolLayers.prototype.layerSelectedMoveUp = function()
	{
		this.layerSelectedMove(new Coords(0, -1));
	}

	ToolLayers.prototype.layerSelectedRaise = function(offset)
	{
		this.layerSelectedRaiseOrLower(1);
	}

	ToolLayers.prototype.layerSelectedRaiseOrLower = function(offset)
	{
		var layerSelected = this.parentView.layerSelected();

		var layers = this.parentView.layers;
		var layerSelectedIndex = layers.indexOf(layerSelected);
		var layerSelectedIndexNext = layerSelectedIndex + offset;
		if (layerSelectedIndexNext >= 0 && layerSelectedIndexNext < layers.length)
		{
			layers.splice(layerSelectedIndex, 1);
			layers.splice(layerSelectedIndexNext, 0, layerSelected);
			this.layerIndexSelected = layerSelectedIndexNext;
			this.controlUpdate();
			this.parentView.controlUpdate();
		}
	}

	ToolLayers.prototype.layerSelectedRemove = function()
	{
		var layerToRemove = this.parentView.layerSelected();

		var layersAll = this.parentView.layers;
		layersAll.splice(this.layerIndexSelected, 1);
		delete layersAll[layerToRemove.name];

		this.layerIndexSelected = 0;

		this.controlUpdate();
		this.parentView.controlUpdate();
	}

	ToolLayers.prototype.layerSelectedRename = function()
	{
		var layerSelected = this.parentView.layerSelected();
		var containerRename = this.control.children["containerRename"];
		var textName = containerRename.children["textName"];
		var nameToSet = textName.value;
		if (nameToSet == "")
		{
			alert("Invalid name!");
		}
		else
		{
			var layersAll = this.parentView.layers;
			delete layersAll[layerSelected.name];
			layerSelected.name = nameToSet;
			layersAll[nameToSet] = layerSelected;

			this.controlUpdate()
			this.parentView.controlUpdate();
		}
	}

	ToolLayers.prototype.layerSetByIndex = function(valueToSet)
	{
		this.layerIndexSelected = valueToSet;
		this.parentView.controlUpdate();
	}

	ToolLayers.prototype.moveStepDistanceChanged = function(valueToSet)
	{
		this.moveStepDistance = parseInt(valueToSet);
	}

	// controllable

	ToolLayers.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			this.selectLayer = new ControlSelectBox
			(
				"selectLayer",
				this.parentView.layers, // options
				"name",
				this.layerSetByIndex.bind(this)
			);

			var containerRename = new ControlContainer
			(
				"containerRename",
				[
					new ControlButton
					(
						"Rename:",
						this.layerSelectedRename.bind(this)
					),
					new ControlTextBox
					(
						"textName", ""
					),
				]
			);

			var containerAddRemoveHide = new ControlContainer
			(
				"containerAddRemoveHide",
				[
					new ControlButton
					(
						"Add",
						this.layerAdd.bind(this)
					),

					new ControlButton
					(
						"Clone",
						this.layerClone.bind(this)
					),

					new ControlButton
					(
						"Remove",
						this.layerSelectedRemove.bind(this)
					),

					new ControlButton
					(
						"Hide/Show",
						this.layerSelectedHideOrShow.bind(this)
					),

				]
			);

			var containerMove = new ControlContainer
			(
				"containerMove",
				[
					new ControlLabel("Move:"),

					new ControlNumberBox
					(
						"numberMoveStepDistance",
						this.moveStepDistance,
						this.moveStepDistanceChanged.bind(this)
					),

					new ControlButton
					(
						"<",
						this.layerSelectedMoveLeft.bind(this)
		 			),
					new ControlButton
					(
						">",
						this.layerSelectedMoveRight.bind(this)
		 			),
					new ControlButton
					(
						"^",
						this.layerSelectedMoveUp.bind(this)
		 			),
					new ControlButton
					(
						"v",
						this.layerSelectedMoveDown.bind(this)
		 			),
				]
			);

			var containerRaiseOrLower = new ControlContainer
			(
				"containerRaiseOrLower",
				[
					new ControlButton
					(
						"Raise",
						this.layerSelectedRaise.bind(this)
					),

					new ControlButton
					(
						"Lower",
						this.layerSelectedLower.bind(this)
					),
					new ControlButton
					(
						"Merge Down",
						this.layerSelectedMergeDown.bind(this)
		 			),
				]
			);

			var returnValue = new ControlContainer
			(
				"contatinerToolLayers",
				[
					new ControlLabel("Layer:"),

					this.selectLayer,

					containerRename,

					containerAddRemoveHide,
	
					containerRaiseOrLower,

					containerMove,

				]
			);

			returnValue.domElementUpdate();

			this.control = returnValue;
		}

		var selectLayer = this.selectLayer;

		selectLayer.options = this.parentView.layers;
		selectLayer.domElementUpdate_Options();
		selectLayer.selectedIndex = this.layerIndexSelected;
		selectLayer.domElementUpdate();

		return this.control;
	}
}

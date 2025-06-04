
class ToolLayers
{
	constructor()
	{
		this.name = ToolLayers.Name();
		this.layerIndexSelected = 0;
		this.moveStepDistance = 10;
	}

	static Name() { return "Layers"; }

	// event handlers

	layerAdd(layerToAdd)
	{
		layerToAdd.parentView = this.parentView;

		var layersAll = this.parentView.layers;
		layersAll.push(layerToAdd);
		layersAll[layerToAdd.name] = layerToAdd;

		this.controlUpdate();
	}

	layerAddAndSelectNew()
	{
		var layerNew = this.layerAddNew();
		this.layerSelect(layerNew);
	}

	layerAddNew()
	{
		var layersAll = this.parentView.layers;
		var layerNewIndex = layersAll.length;
		var layerNew = new Layer
		(
			"Layer" + layerNewIndex, 
			this.parentView.size.clone(),
			new Coords(0, 0) // offset
		);
		this.layerAdd(layerNew);
		return layerNew;
	}

	layerClone()
	{
		var layerToClone = this.layerSelected();
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

	layerSelect(layerToSelect)
	{
		var layersAll = this.parentView.layers;
		var layerToSelectIndex = layersAll.indexOf(layerToSelect);
		this.layerSetByIndex(layerToSelectIndex);

		this.controlUpdateOffset();
		this.parentView.controlUpdate();
	}

	layerSelected()
	{
		return this.parentView.layerSelected();
	}

	layerSelectedHideOrShow()
	{
		var layerSelected = this.layerSelected();
		layerSelected.isVisible =
			(layerSelected.isVisible == false);
		this.controlUpdate();
		this.parentView.controlUpdate();
	}

	layerSelectedLower(offset)
	{
		this.layerSelectedRaiseOrLower(-1);
	}

	layerSelectedMergeDown()
	{
		var layerSelected = this.layerSelected();
		var layersAll = this.parentView.layers;
		var layerSelectedIndex = layersAll.indexOf(layerSelected);

		var layerToDrawTo;

		if (layerSelectedIndex == 0)
		{
			layerToDrawTo = this.layerAddNew();
		}
		else
		{
			var layerUnderneathIndex = layerSelectedIndex - 1;
			layerToDrawTo = layersAll[layerUnderneathIndex];
		}

		var drawPos =
			layerSelected.offset
				.clone()
				.subtract(layerToDrawTo.offset);

		layerToDrawTo.display.drawOther
		(
			layerSelected.display,
			drawPos
		);

		this.layerSelectedRemove();

		this.layerSelect(layerToDrawTo);
	}

	layerSelectedMove(direction)
	{
		var moveAmount =
			direction.clone().multiplyScalar(this.moveStepDistance);
		var layerSelected = this.layerSelected();
		var layerSelectedOffset = layerSelected.offset;
		layerSelectedOffset.add(moveAmount);

		this.controlUpdateOffset();
		this.parentView.controlUpdate();
	}

	layerSelectedMoveDown()
	{
		this.layerSelectedMove(new Coords(0, 1) );
	}

	layerSelectedMoveLeft()
	{
		this.layerSelectedMove(new Coords(-1, 0) );
	}

	layerSelectedMoveRight()
	{
		this.layerSelectedMove(new Coords(1, 0) );
	}

	layerSelectedMoveUp()
	{
		this.layerSelectedMove(new Coords(0, -1) );
	}

	layerSelectedOffsetChanged()
	{
		var layerSelected = this.layerSelected();

		var containerOffset =
			this.control.childByName("containerOffset");

		var numberLayerSelectedOffsetX =
			containerOffset.childByName("numberLayerSelectedOffsetX");
		var layerSelectedOffsetXAsString =
			numberLayerSelectedOffsetX.value;
		var layerSelectedOffsetX =
			parseInt(layerSelectedOffsetXAsString);

		var numberLayerSelectedOffsetY =
			containerOffset.childByName("numberLayerSelectedOffsetY");
		var layerSelectedOffsetYAsString =
			numberLayerSelectedOffsetY.value;
		var layerSelectedOffsetY =
			parseInt(layerSelectedOffsetYAsString);

		layerSelected.offset.overwriteWithDimensions
		(
			layerSelectedOffsetX,
			layerSelectedOffsetY
		);

		this.parentView.controlUpdate();
	}

	layerSelectedRaise(offset)
	{
		this.layerSelectedRaiseOrLower(1);
	}

	layerSelectedRaiseOrLower(offset)
	{
		var layerSelected = this.layerSelected();

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

	layerSelectedRemove()
	{
		var layerToRemove = this.layerSelected();

		var layersAll = this.parentView.layers;
		layersAll.splice(this.layerIndexSelected, 1);

		this.layerIndexSelected = 0;

		this.controlUpdate();
		this.parentView.controlUpdate();
	}

	layerSelectedRename()
	{
		var layerSelected = this.layerSelected();
		var containerRename = this.control.childByName("containerRename");
		var textName = containerRename.childByName("textName");
		var nameToSet = textName.value;
		if (nameToSet == "")
		{
			alert("Invalid name!");
		}
		else
		{
			var layersAll = this.parentView.layers;
			layerSelected.name = nameToSet;
			layersAll[nameToSet] = layerSelected;

			this.controlUpdate();
			this.parentView.controlUpdate();
		}
	}

	layerSetByIndex(valueToSet)
	{
		this.layerIndexSelected = valueToSet;
		this.parentView.controlUpdate();
	}

	moveStepDistanceChanged(valueToSet)
	{
		this.moveStepDistance = parseInt(valueToSet);
	}

	// controllable

	controlUpdate()
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
						this.layerAddAndSelectNew.bind(this)
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

			var containerOffset = new ControlContainer
			(
				"containerOffset",
				[
					new ControlLabel("Offset:"),

					new ControlLabel("X:"),

					new ControlNumberBox
					(
						"numberLayerSelectedOffsetX",
						this.layerSelected().offset.x,
						this.layerSelectedOffsetChanged.bind(this)
					),

					new ControlLabel("Y:"),

					new ControlNumberBox
					(
						"numberLayerSelectedOffsetY",
						this.layerSelected().offset.y,
						this.layerSelectedOffsetChanged.bind(this)
					),

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
				"containerToolLayers",
				[
					new ControlLabel("Layer:"),

					this.selectLayer,

					containerRename,

					containerAddRemoveHide,

					containerRaiseOrLower,

					containerOffset
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

	controlUpdateOffset()
	{
		var containerOffset =
			this.control.childByName("containerOffset");
		var numberLayerSelectedOffsetX =
			containerOffset.childByName("numberLayerSelectedOffsetX");
		var numberLayerSelectedOffsetY =
			containerOffset.childByName("numberLayerSelectedOffsetY");

		var layerSelected = this.layerSelected();
		var layerSelectedOffset = layerSelected.offset;

		numberLayerSelectedOffsetX.value =
			layerSelectedOffset.x;
		numberLayerSelectedOffsetY.value =
			layerSelectedOffset.y;
		numberLayerSelectedOffsetX.domElementUpdate();
		numberLayerSelectedOffsetY.domElementUpdate();
	}
}

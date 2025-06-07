
class ToolLayers extends Tool
{
	layerIndexSelected: number;
	moveStepDistance: number;

	constructor()
	{
		super(ToolLayers.Name() );
		this.layerIndexSelected = 0;
		this.moveStepDistance = 10;
	}

	static Name(): string { return "Layers"; }

	// event handlers

	layerAdd(layerToAdd: Layer): void
	{
		layerToAdd.parentView = this.parentView;

		var layersAll = this.parentView.layers;
		layersAll.push(layerToAdd);
		//layersAll[layerToAdd.name] = layerToAdd;

		this.controlUpdate();
	}

	layerAddAndSelectNew(): void
	{
		var layerNew = this.layerAddNew();
		this.layerSelect(layerNew);
	}

	layerAddNew(): Layer
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

	layerClone(): void
	{
		var layerToClone = this.layerSelected();
		var layersAll = this.parentView.layers;
		var layerClonedName = layerToClone + "_Clone";
		var layerCloned = new Layer
		(
			layerClonedName,
			layerToClone.size.clone(),
			null // ?
		);
		layerCloned.parentView = this.parentView;
		var layerClonedIndex = layersAll.indexOf(layerToClone) + 1;
		layersAll.splice(layerClonedIndex, 0, layerCloned);
		//layersAll[layerCloned.name] = layerCloned;

		this.layerIndexSelected = layerClonedIndex;

		this.controlUpdate();
	}

	layerSelect(layerToSelect: Layer): void
	{
		var layersAll = this.parentView.layers;
		var layerToSelectIndex = layersAll.indexOf(layerToSelect);
		this.layerSetByIndex(layerToSelectIndex);

		this.controlUpdateOffset();
		this.parentView.controlUpdate();
	}

	layerSelected(): Layer
	{
		return this.parentView.layerSelected();
	}

	layerSelectedHideOrShow(): void
	{
		var layerSelected = this.layerSelected();
		layerSelected.isVisible =
			(layerSelected.isVisible == false);
		this.controlUpdate();
		this.parentView.controlUpdate();
	}

	layerSelectedLower(offset: Coords): void
	{
		this.layerSelectedRaiseOrLower(-1);
	}

	layerSelectedMergeDown(): void
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
			drawPos,
			null, null // ?
		);

		this.layerSelectedRemove();

		this.layerSelect(layerToDrawTo);
	}

	layerSelectedMove(direction: Coords): void
	{
		var moveAmount =
			direction.clone().multiplyScalar(this.moveStepDistance);
		var layerSelected = this.layerSelected();
		var layerSelectedOffset = layerSelected.offset;
		layerSelectedOffset.add(moveAmount);

		this.controlUpdateOffset();
		this.parentView.controlUpdate();
	}

	layerSelectedMoveDown(): void
	{
		this.layerSelectedMove(new Coords(0, 1) );
	}

	layerSelectedMoveLeft(): void
	{
		this.layerSelectedMove(new Coords(-1, 0) );
	}

	layerSelectedMoveRight(): void
	{
		this.layerSelectedMove(new Coords(1, 0) );
	}

	layerSelectedMoveUp(): void
	{
		this.layerSelectedMove(new Coords(0, -1) );
	}

	layerSelectedOffsetChanged(): void
	{
		var layerSelected = this.layerSelected();

		var control = this.control as ControlContainer;
		var containerOffset =
			control.childByName("containerOffset") as ControlContainer;

		var numberLayerSelectedOffsetX =
			containerOffset.childByName("numberLayerSelectedOffsetX") as ControlNumberBox;
		var layerSelectedOffsetX =
			numberLayerSelectedOffsetX.value;

		var numberLayerSelectedOffsetY =
			containerOffset.childByName("numberLayerSelectedOffsetY") as ControlNumberBox;
		var layerSelectedOffsetY =
			numberLayerSelectedOffsetY.value;

		layerSelected.offset.overwriteWithDimensions
		(
			layerSelectedOffsetX,
			layerSelectedOffsetY
		);

		this.parentView.controlUpdate();
	}

	layerSelectedRaise(offset: number): void
	{
		this.layerSelectedRaiseOrLower(1);
	}

	layerSelectedRaiseOrLower(offset: number): void
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

	layerSelectedRemove(): void
	{
		var layersAll = this.parentView.layers;
		layersAll.splice(this.layerIndexSelected, 1);

		this.layerIndexSelected = 0;

		this.controlUpdate();
		this.parentView.controlUpdate();
	}

	layerSelectedRename(): void
	{
		var layerSelected = this.layerSelected();
		var control = this.control as ControlContainer;
		var containerRename = control.childByName("containerRename") as ControlContainer;
		var textName = containerRename.childByName("textName") as ControlTextBox;
		var nameToSet = textName.value;
		if (nameToSet == "")
		{
			alert("Invalid name!");
		}
		else
		{
			layerSelected.name = nameToSet;

			this.controlUpdate();
			this.parentView.controlUpdate();
		}
	}

	layerSetByIndex(valueToSet: number): void
	{
		this.layerIndexSelected = valueToSet;
		this.parentView.controlUpdate();
	}

	moveStepDistanceChanged(valueToSet: string): void
	{
		this.moveStepDistance = parseInt(valueToSet);
	}

	// controllable

	selectLayer: ControlSelectBox;

	controlUpdate(): Control
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
						"textName", "", null // ?
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
						this.layerSelectedOffsetChanged.bind(this),
						null // max
					),

					new ControlLabel("Y:"),

					new ControlNumberBox
					(
						"numberLayerSelectedOffsetY",
						this.layerSelected().offset.y,
						this.layerSelectedOffsetChanged.bind(this),
						null // max
					),

					new ControlLabel("Move:"),

					new ControlNumberBox
					(
						"numberMoveStepDistance",
						this.moveStepDistance,
						this.moveStepDistanceChanged.bind(this),
						null // max
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

	controlUpdateOffset(): void
	{
		var control = this.control as ControlContainer;
		var containerOffset =
			control.childByName("containerOffset") as ControlContainer;
		var numberLayerSelectedOffsetX =
			containerOffset.childByName("numberLayerSelectedOffsetX") as ControlNumberBox;
		var numberLayerSelectedOffsetY =
			containerOffset.childByName("numberLayerSelectedOffsetY") as ControlNumberBox;

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

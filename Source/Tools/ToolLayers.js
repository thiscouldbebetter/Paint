"use strict";
class ToolLayers extends Tool {
    constructor() {
        super(ToolLayers.Name());
        this.layerIndexSelected = 0;
        this.moveStepDistance = 10;
    }
    static Name() { return "Layers"; }
    // event handlers
    layerAdd(layerToAdd) {
        var view = this.parentView();
        layerToAdd.parentViewSet(view);
        view.layerGroup.layerAdd(layerToAdd);
        this.controlUpdate();
    }
    layerAddAndSelectNew() {
        var layerNew = this.layerAddNew();
        this.layerSelect(layerNew);
    }
    layerAddNew() {
        var view = this.parentView();
        var layersAll = view.layerGroup.layers();
        var layerNewIndex = layersAll.length;
        var layerNew = Layer.fromNameAndSize("Layer" + layerNewIndex, view.size.clone());
        this.layerAdd(layerNew);
        return layerNew;
    }
    layerClone() {
        var layerToClone = this.layerSelected();
        var view = this.parentView();
        var layerGroup = view.layerGroup;
        var layersAll = layerGroup.layers();
        var layerClonedName = layerToClone + "_Clone";
        var layerCloned = Layer.fromNameAndSize(layerClonedName, layerToClone.size.clone());
        layerCloned.parentViewSet(view);
        var layerClonedIndex = layersAll.indexOf(layerToClone) + 1;
        layerGroup.layerInsertAtIndex(layerCloned, layerClonedIndex);
        this.layerIndexSelected = layerClonedIndex;
        this.controlUpdate();
    }
    layerSelect(layerToSelect) {
        var view = this.parentView();
        var layersAll = view.layerGroup.layers();
        var layerToSelectIndex = layersAll.indexOf(layerToSelect);
        this.layerSetByIndex(layerToSelectIndex);
        this.controlUpdateOffset();
        view.controlUpdate();
    }
    layerSelected() {
        var view = this.parentView();
        return view.layerSelected();
    }
    layerSelectedHideOrShow() {
        var layerSelected = this.layerSelected();
        layerSelected.isVisible =
            (layerSelected.isVisible == false);
        this.controlUpdate();
        var view = this.parentView();
        view.controlUpdate();
    }
    layerSelectedLower(offset) {
        this.layerSelectedRaiseOrLower(-1);
    }
    layerSelectedMergeDown() {
        var layerSelected = this.layerSelected();
        var view = this.parentView();
        var layersAll = view.layerGroup.layers();
        var layerSelectedIndex = layersAll.indexOf(layerSelected);
        var layerToDrawTo;
        if (layerSelectedIndex == 0) {
            layerToDrawTo = this.layerAddNew();
        }
        else {
            var layerUnderneathIndex = layerSelectedIndex - 1;
            layerToDrawTo = layersAll[layerUnderneathIndex];
        }
        var drawPos = layerSelected.offset
            .clone()
            .subtract(layerToDrawTo.offset);
        layerToDrawTo.display.drawOther(layerSelected.display, drawPos, null, null // ?
        );
        this.layerSelectedRemove();
        this.layerSelect(layerToDrawTo);
    }
    layerSelectedMove(direction) {
        var moveAmount = direction.clone().multiplyScalar(this.moveStepDistance);
        var layerSelected = this.layerSelected();
        var layerSelectedOffset = layerSelected.offset;
        layerSelectedOffset.add(moveAmount);
        this.controlUpdateOffset();
        var view = this.parentView();
        view.controlUpdate();
    }
    layerSelectedMoveDown() {
        this.layerSelectedMove(new Coords(0, 1));
    }
    layerSelectedMoveLeft() {
        this.layerSelectedMove(new Coords(-1, 0));
    }
    layerSelectedMoveRight() {
        this.layerSelectedMove(new Coords(1, 0));
    }
    layerSelectedMoveUp() {
        this.layerSelectedMove(new Coords(0, -1));
    }
    layerSelectedOffsetChanged() {
        var layerSelected = this.layerSelected();
        var control = this.control;
        var containerOffset = control.childByName("containerOffset");
        var numberLayerSelectedOffsetX = containerOffset.childByName("numberLayerSelectedOffsetX");
        var layerSelectedOffsetX = numberLayerSelectedOffsetX.value;
        var numberLayerSelectedOffsetY = containerOffset.childByName("numberLayerSelectedOffsetY");
        var layerSelectedOffsetY = numberLayerSelectedOffsetY.value;
        layerSelected.offset.overwriteWithDimensions(layerSelectedOffsetX, layerSelectedOffsetY);
        var view = this.parentView();
        view.controlUpdate();
    }
    layerSelectedRaise(offset) {
        this.layerSelectedRaiseOrLower(1);
    }
    layerSelectedRaiseOrLower(offset) {
        var view = this.parentView();
        var layerSelected = this.layerSelected();
        var layerGroup = view.layerGroup;
        var layers = layerGroup.layers();
        var layerSelectedIndex = layers.indexOf(layerSelected);
        var layerSelectedIndexNext = layerSelectedIndex + offset;
        if (layerSelectedIndexNext >= 0 && layerSelectedIndexNext < layers.length) {
            layerGroup.layerRemoveAtIndex(layerSelectedIndex);
            layerGroup.layerInsertAtIndex(layerSelected, layerSelectedIndexNext);
            this.layerIndexSelected = layerSelectedIndexNext;
            this.controlUpdate();
            view.controlUpdate();
        }
    }
    layerSelectedRemove() {
        var view = this.parentView();
        view.layerGroup.layerRemoveAtIndex(this.layerIndexSelected);
        this.layerIndexSelected = 0;
        this.controlUpdate();
        view.controlUpdate();
    }
    layerSelectedRename() {
        var layerSelected = this.layerSelected();
        var control = this.control;
        var containerRename = control.childByName("containerRename");
        var textName = containerRename.childByName("textName");
        var nameToSet = textName.value;
        if (nameToSet == "") {
            alert("Invalid name!");
        }
        else {
            layerSelected.name = nameToSet;
            this.controlUpdate();
            this.parentView().controlUpdate();
        }
    }
    layerSetByIndex(valueToSet) {
        this.layerIndexSelected = valueToSet;
        this.parentView().controlUpdate();
    }
    moveStepDistanceChanged(valueToSet) {
        this.moveStepDistance = parseInt(valueToSet);
    }
    controlUpdate() {
        var view = this.parentView();
        var layers = view.layerGroup.layers();
        if (this.control == null) {
            this.selectLayer = new ControlSelectBox("selectLayer", layers, // options
            "name", this.layerSetByIndex.bind(this));
            var containerRename = new ControlContainer("containerRename", [
                new ControlButton("Rename:", this.layerSelectedRename.bind(this)),
                new ControlTextBox("textName", "", null // ?
                ),
            ]);
            var containerAddRemoveHide = new ControlContainer("containerAddRemoveHide", [
                new ControlButton("Add", this.layerAddAndSelectNew.bind(this)),
                new ControlButton("Clone", this.layerClone.bind(this)),
                new ControlButton("Remove", this.layerSelectedRemove.bind(this)),
                new ControlButton("Hide/Show", this.layerSelectedHideOrShow.bind(this)),
            ]);
            var containerOffset = new ControlContainer("containerOffset", [
                new ControlLabel("Offset:"),
                new ControlLabel("X:"),
                new ControlNumberBox("numberLayerSelectedOffsetX", this.layerSelected().offset.x, this.layerSelectedOffsetChanged.bind(this), null // max
                ),
                new ControlLabel("Y:"),
                new ControlNumberBox("numberLayerSelectedOffsetY", this.layerSelected().offset.y, this.layerSelectedOffsetChanged.bind(this), null // max
                ),
                new ControlLabel("Move:"),
                new ControlNumberBox("numberMoveStepDistance", this.moveStepDistance, this.moveStepDistanceChanged.bind(this), null // max
                ),
                new ControlButton("<", this.layerSelectedMoveLeft.bind(this)),
                new ControlButton(">", this.layerSelectedMoveRight.bind(this)),
                new ControlButton("^", this.layerSelectedMoveUp.bind(this)),
                new ControlButton("v", this.layerSelectedMoveDown.bind(this)),
            ]);
            var containerRaiseOrLower = new ControlContainer("containerRaiseOrLower", [
                new ControlButton("Raise", this.layerSelectedRaise.bind(this)),
                new ControlButton("Lower", this.layerSelectedLower.bind(this)),
                new ControlButton("Merge Down", this.layerSelectedMergeDown.bind(this)),
            ]);
            var returnValue = new ControlContainer("containerToolLayers", [
                new ControlLabel("Layer:"),
                this.selectLayer,
                containerRename,
                containerAddRemoveHide,
                containerRaiseOrLower,
                containerOffset
            ]);
            returnValue.domElementUpdate();
            this.control = returnValue;
        }
        var selectLayer = this.selectLayer;
        selectLayer.options = layers;
        selectLayer.domElementUpdate_Options();
        selectLayer.selectedIndex = this.layerIndexSelected;
        selectLayer.domElementUpdate();
        return this.control;
    }
    controlUpdateOffset() {
        var control = this.control;
        var containerOffset = control.childByName("containerOffset");
        var numberLayerSelectedOffsetX = containerOffset.childByName("numberLayerSelectedOffsetX");
        var numberLayerSelectedOffsetY = containerOffset.childByName("numberLayerSelectedOffsetY");
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

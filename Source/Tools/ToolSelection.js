"use strict";
class ToolSelection extends Tool {
    constructor() {
        super(ToolSelection.Name());
    }
    static Name() { return "Select"; }
    // event handlers
    copy() {
        this.copyOrCut(false);
    }
    cut() {
        this.copyOrCut(true);
    }
    copyOrCut(cutRatherThanCopy) {
        var view = this.parentView();
        var layerSelected = view.layerSelected();
        var selection = view.selection;
        var layerForClipboard = new Layer("layerClipboard", selection.size.clone(), new Coords(0, 0) // offset
        );
        layerForClipboard.display.drawOther(layerSelected.display, new Coords(0, 0), // target pos
        selection.pos, selection.size);
        if (cutRatherThanCopy == true) {
            layerSelected.display.clearRectangle(selection.pos.clone().subtract(layerSelected.offset), selection.size);
        }
        selection.pos = null;
        this.layerForClipboard = layerForClipboard;
        view.controlUpdate();
    }
    paste() {
        var view = this.parentView();
        var layerForClipboard = this.layerForClipboard;
        if (layerForClipboard != null) {
            var layersAll = view.layerGroup.layers();
            layersAll.push(layerForClipboard);
            this.layerForClipboard = null;
            var toolLayers = view.toolLayers();
            toolLayers.layerIndexSelected = layersAll.length - 1;
            toolLayers.controlUpdate();
            view.controlUpdate();
        }
    }
    processMouseDown() {
        var view = this.parentView();
        var selection = view.selection;
        var mousePos = view.mousePos;
        if (selection.pos == null) {
            selection.pos = mousePos.clone();
            selection.size = Coords.zeroes();
            selection.isComplete = false;
            selection.isBeingMoved = false;
        }
        else if (mousePos.isInRangeMinMax(selection.pos, selection.max())) {
            selection.isBeingMoved = true;
        }
        else {
            selection.pos = null;
        }
        view.controlUpdate();
    }
    processMouseMove() {
        var view = this.parentView();
        var selection = view.selection;
        if (selection.pos == null) {
            // do nothing
        }
        else if (selection.isComplete == false) {
            selection.size.overwriteWith(view.mousePos).subtract(selection.pos);
        }
        else if (selection.isBeingMoved) {
            var mousePos = view.mousePos;
            var mousePosPrev = view.mousePosPrev;
            var mouseMove = mousePos.clone().subtract(mousePosPrev);
            selection.pos.add(mouseMove);
        }
        view.controlUpdate();
    }
    processMouseUp() {
        var view = this.parentView();
        var selection = view.selection;
        selection.isComplete = true;
        view.controlUpdate();
    }
    processSelection() {
        this.parentView().toolSelect(this);
    }
    // controllable
    controlUpdate() {
        if (this.control == null) {
            var returnValue = new ControlContainer("containerSelect", [
                new ControlButton(this.name, this.processSelection.bind(this)),
                new ControlButton("Cut", this.cut.bind(this)),
                new ControlButton("Copy", this.copy.bind(this)),
                new ControlButton("Paste", this.paste.bind(this)),
            ]);
            this.control = returnValue;
        }
        return this.control;
    }
}

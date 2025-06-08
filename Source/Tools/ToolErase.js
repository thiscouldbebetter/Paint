"use strict";
class ToolErase extends Tool {
    constructor() {
        super(ToolErase.Name());
    }
    static Name() { return "Erase"; }
    // event handlers
    processMouseDown() {
        // Do nothing.
    }
    processMouseMove() {
        var view = this.parentView();
        var layerSelected = view.layerSelected();
        var layerSelectedOffset = layerSelected.offset;
        var posFrom = view.mousePosPrev
            .clone()
            .subtract(layerSelectedOffset);
        var posTo = view.mousePos
            .clone()
            .subtract(layerSelectedOffset);
        var toolBrushSize = view.toolBrushSize();
        layerSelected.display.clearLine(posFrom, posTo, toolBrushSize.brushSizeSelected);
        view.controlUpdate();
    }
    processSelection() {
        this.parentView().toolSelect(this);
    }
    // Controllable.
    controlUpdate() {
        if (this.control == null) {
            var returnValue = new ControlContainer("containerPaint", [
                new ControlButton(this.name, this.processSelection.bind(this))
            ]);
            this.control = returnValue;
        }
        return this.control;
    }
}

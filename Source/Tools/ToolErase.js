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
        var layerSelected = this.parentView.layerSelected();
        var layerSelectedOffset = layerSelected.offset;
        var posFrom = this.parentView.mousePosPrev.clone().subtract(layerSelectedOffset);
        var posTo = this.parentView.mousePos.clone().subtract(layerSelectedOffset);
        var toolBrushSize = this.parentView.toolBrushSize();
        layerSelected.display.clearLine(posFrom, posTo, toolBrushSize.brushSizeSelected);
        this.parentView.controlUpdate();
    }
    processSelection() {
        this.parentView.toolSelected = this;
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

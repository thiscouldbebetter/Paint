"use strict";
class ToolPaint extends Tool {
    constructor() {
        super(ToolPaint.Name());
    }
    static Name() { return "Paint"; }
    // event handlers
    processMouseDown() {
        // Do nothing.
    }
    processMouseMove() {
        var layerSelected = this.parentView.layerSelected();
        var layerSelectedOffset = layerSelected.offset;
        var posFrom = this.parentView.mousePosPrev.clone().subtract(layerSelectedOffset);
        var posTo = this.parentView.mousePos.clone().subtract(layerSelectedOffset);
        var toolColorPalette = this.parentView.toolColorPalette();
        var toolBrushSize = this.parentView.toolBrushSize();
        layerSelected.display.drawLine(posFrom, posTo, toolColorPalette.colorSelected, toolBrushSize.brushSizeSelected);
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

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
        var view = this.parentView();
        var layerSelected = view.layerSelected();
        var layerSelectedOffset = layerSelected.offset;
        var posFrom = view.mousePosPrev
            .clone()
            .subtract(layerSelectedOffset);
        var posTo = view.mousePos
            .clone()
            .subtract(layerSelectedOffset);
        var toolColorPalette = view.toolColorPalette();
        var toolBrushSize = view.toolBrushSize();
        layerSelected.display.drawLine(posFrom, posTo, toolColorPalette.colorSelected, toolBrushSize.brushSizeSelected);
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

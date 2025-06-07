"use strict";
class ToolBrushSize extends Tool {
    constructor() {
        super(ToolBrushSize.Name());
        this.brushSizeSelected = 1;
    }
    static Name() { return "BrushSize"; }
    brushSizeSet(valueToSet) {
        this.brushSizeSelected = valueToSet;
    }
    controlUpdate() {
        if (this.control == null) {
            var returnValue = new ControlContainer("containerToolBrushSize", [
                new ControlLabel("Brush Size:"),
                new ControlNumberBox(null, // id
                this.brushSizeSelected, // value
                this.brushSizeSet.bind(this), null // max?
                ),
            ]);
            this.control = returnValue;
        }
        return this.control;
    }
}

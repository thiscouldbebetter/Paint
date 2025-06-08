"use strict";
class ToolViewSize extends Tool {
    constructor() {
        super(ToolViewSize.Name());
    }
    static Name() { return "ViewSize"; }
    // event handlers
    viewSizeXChanged(valueToSet) {
        this.parentView().size.x = valueToSet;
        this.viewSizeSet();
    }
    viewSizeYChanged(valueToSet) {
        this.parentView().size.y = valueToSet;
        this.viewSizeSet();
    }
    viewSizeSet() {
        var view = this.parentView();
        var size = view.size;
        var control = view.control;
        var viewCanvas = control.childByName("viewCanvas");
        var displayMain = viewCanvas.display;
        displayMain.sizeSet(size);
        var layers = view.layerGroup.layers();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            layer.display.sizeSet(size);
            displayMain.drawOther(layer.display, Coords.Instances().Zeroes, null, null // ?
            );
        }
    }
    // control
    controlUpdate() {
        if (this.control == null) {
            var size = this.parentView().size;
            var returnValue = new ControlContainer("controlToolViewSize", [
                new ControlLabel("Canvas Size:"),
                new ControlNumberBox("numberViewSizeX", size.x, this.viewSizeXChanged.bind(this), null // max
                ),
                new ControlNumberBox("numberViewSizeY", size.y, this.viewSizeYChanged.bind(this), null // max
                ),
            ]);
            this.control = returnValue;
        }
        return this.control;
    }
}

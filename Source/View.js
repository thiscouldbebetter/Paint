"use strict";
class View {
    constructor(size, toolNameToSelectInitial, tools) {
        this.size = size;
        this.tools = tools;
        for (var i = 0; i < this.tools.length; i++) {
            var tool = this.tools[i];
            tool.parentView = this;
        }
        this.toolSelected = this.toolByName(toolNameToSelectInitial);
        this.layers =
            [
                new Layer("Layer0", size, new Coords(0, 0)),
            ];
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            layer.parentView = this;
        }
        this.isMouseDown = false;
        this.mousePos = new Coords(0, 0);
        this.mousePosPrev = new Coords(0, 0);
        this.selection = Selection_.create();
    }
    // static methods
    static imageURLForAlphaZeroBuild() {
        var imageSizeInPixels = new Coords(32, 32);
        var imageSizeInPixelsHalf = imageSizeInPixels.clone().divideScalar(2);
        var canvas = document.createElement("canvas");
        canvas.width = imageSizeInPixels.x;
        canvas.height = imageSizeInPixels.y;
        var graphicsForCanvas = canvas.getContext("2d");
        var colors = Color.Instances();
        graphicsForCanvas.fillStyle =
            colors.Gray.systemColor();
        graphicsForCanvas.fillRect(0, 0, imageSizeInPixels.x, imageSizeInPixels.y);
        graphicsForCanvas.fillStyle =
            colors.GrayLight.systemColor();
        graphicsForCanvas.fillRect(0, 0, imageSizeInPixelsHalf.x, imageSizeInPixelsHalf.y);
        graphicsForCanvas.fillRect(imageSizeInPixelsHalf.x, imageSizeInPixelsHalf.y, imageSizeInPixelsHalf.x, imageSizeInPixelsHalf.y);
        var imageFromCanvasURL = canvas.toDataURL("image/png");
        return imageFromCanvasURL;
    }
    // instance methods
    layerSelected() {
        var layerIndexSelected = this.toolLayers().layerIndexSelected;
        var returnValue = this.layers[layerIndexSelected];
        return returnValue;
    }
    toolByName(name) {
        return this.tools.find(x => x.name == name);
    }
    // Tools.
    toolBrushSize() {
        return this.toolByName(ToolBrushSize.Name());
    }
    toolColorPalette() {
        return this.toolByName(ToolColorPalette.Name());
    }
    toolFile() {
        return this.toolByName(ToolFile.Name());
    }
    toolFill() {
        return this.toolByName(ToolFill.Name());
    }
    toolLayers() {
        return this.toolByName(ToolLayers.Name());
    }
    toolPaint() {
        return this.toolByName(ToolPaint.Name());
    }
    toolSelect() {
        return this.toolByName(ToolSelect.Name());
    }
    toolViewSize() {
        return this.toolByName(ToolViewSize.Name());
    }
    // Event handlers.
    processMouseDown(event) {
        event.preventDefault(); // otherwise the cursor changes
        var boundingClientRect = event.target.getBoundingClientRect();
        this.mousePos.overwriteWithDimensions(event.clientX - boundingClientRect.left, event.clientY - boundingClientRect.top);
        this.mousePosPrev.overwriteWith(this.mousePos);
        this.isMouseDown = true;
        this.toolSelected.processMouseDown();
    }
    processMouseOver(event) {
        // Do nothing.
    }
    processMouseOut(event) {
        this.isMouseDown = false;
    }
    processMouseMove(event) {
        if (this.isMouseDown) {
            this.mousePosPrev.overwriteWith(this.mousePos);
            var boundingClientRect = event.target.getBoundingClientRect();
            this.mousePos.overwriteWithDimensions(event.clientX - boundingClientRect.left, event.clientY - boundingClientRect.top);
            this.toolSelected.processMouseMove();
        }
    }
    processMouseUp(event) {
        this.isMouseDown = false;
    }
    controlUpdate() {
        if (this.control == null) {
            this.controlCanvas = new ControlCanvas("viewCanvas", this.size, this.layers, this.processMouseDown.bind(this), this.processMouseMove.bind(this), this.processMouseOut.bind(this), this.processMouseOver.bind(this), this.processMouseUp.bind(this));
            var containerTools = new ControlContainer("containerTools", Control.controllablesToControls(this.tools));
            var containerView = new ControlContainer("containerView", [
                this.controlCanvas,
                containerTools,
            ]);
            this.control = containerView;
        }
        this.control.domElementUpdate();
        this.drawToDisplay(this.controlCanvas.display);
        return this.control;
    }
    // drawable
    drawToDisplay(display) {
        if (this.selection.pos != null) {
            display.drawRectangle(this.selection.pos, this.selection.size, null, // colorFill
            Color.Instances().Cyan // colorBorder
            );
        }
    }
}

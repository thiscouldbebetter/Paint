"use strict";
class Layer {
    constructor(name, size, offset) {
        this.name = name;
        this.size = size;
        this.offset = offset;
        this.isVisible = true;
        this.display = new Display(size);
        this.display.initialize();
    }
    static fromNameAndSize(name, size) {
        return new Layer(name, size, Coords.zeroes());
    }
    parentView() {
        return this._parentView;
    }
    parentViewSet(value) {
        this._parentView = value;
        return this;
    }
}

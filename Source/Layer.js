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
}

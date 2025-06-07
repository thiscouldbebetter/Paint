"use strict";
class Selection_ {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this._max = Coords.create();
        this.color = Color.Instances().Cyan; // todo
    }
    static create() {
        return new Selection_(Coords.create(), Coords.create());
    }
    drawToDisplay(display) {
        display.drawRectangle(this.pos, this.size, null, this.color);
    }
    max() {
        return this._max.overwriteWith(this.pos).add(this.size);
    }
}

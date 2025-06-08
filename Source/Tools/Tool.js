"use strict";
class Tool {
    constructor(name) {
        this.name = name;
    }
    parentView() {
        return this._parentView;
    }
    parentViewSet(value) {
        this._parentView = value;
        return this;
    }
    controlUpdate() {
        throw new Error("Must be implemented in subclass.");
    }
    processMouseDown() {
        throw new Error("Must be implemented in subclass.");
    }
    processMouseMove() {
        throw new Error("Must be implemented in subclass.");
    }
    processSelection() {
        throw new Error("Must be implemented in subclass.");
    }
}

"use strict";
class Tool {
    constructor(name) {
        this.name = name;
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

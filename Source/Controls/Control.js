"use strict";
class Control {
    constructor(name) {
        this.name = name;
    }
    static controllablesToControls(controllables) {
        var returnValues = [];
        for (var i = 0; i < controllables.length; i++) {
            var controllable = controllables[i];
            var control = controllable.controlUpdate();
            returnValues.push(control);
        }
        return returnValues;
    }
    domElementUpdate() {
        throw new Error("Must be implemented in subclass.");
    }
    handleEventClick(event) {
        throw new Error("Must be implemented in subclass.");
    }
}

"use strict";
class ControlLabel extends Control {
    constructor(text) {
        super("label" + text);
        this.text = text;
    }
    // dom
    domElementUpdate() {
        if (this.domElement == null) {
            var returnValue = document.createElement("label");
            returnValue.innerHTML = this.text;
            this.domElement = returnValue;
        }
        return this.domElement;
    }
}

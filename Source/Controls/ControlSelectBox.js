"use strict";
class ControlSelectBox extends Control {
    constructor(name, options, optionValueFieldName, change) {
        super(name);
        this.options = options;
        this.optionValueFieldName = optionValueFieldName;
        this.change = change;
        this.selectedIndex = null;
    }
    // DOM.
    domElementUpdate() {
        if (this.domElement == null) {
            var returnValue = document.createElement("select");
            returnValue.id = this.name;
            returnValue.onchange = this.handleEventValueChanged.bind(this);
            this.domElement = returnValue;
            this.domElementUpdate_Options();
        }
        if (this.selectedIndex != null) {
            this.domElement.selectedIndex = this.selectedIndex;
        }
        return this.domElement;
    }
    domElementUpdate_Options() {
        this.domElement.innerHTML = "";
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            var optionValue = option[this.optionValueFieldName];
            var optionText = optionValue; // todo
            var optionAsDOMElement = document.createElement("option");
            optionAsDOMElement.innerHTML = optionText;
            this.domElement.appendChild(optionAsDOMElement);
        }
    }
    // event handlers
    handleEventValueChanged(event) {
        var valueToSet = event.target.value;
        if (this.change != null) {
            this.change(valueToSet);
        }
    }
}

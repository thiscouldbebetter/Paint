"use strict";
class LayerGroup {
    constructor(layers) {
        this._layers = layers;
    }
    static fromSize(size) {
        return new LayerGroup([
            Layer.fromNameAndSize("Layer0", size)
        ]);
    }
    layerAdd(layer) {
        this._layers.push(layer);
        return this;
    }
    layerAtIndex(index) {
        return this._layers[index];
    }
    layerInsertAtIndex(layer, index) {
        this._layers.splice(index, 0, layer);
        return this;
    }
    layerRemoveAtIndex(index) {
        this._layers.splice(index, 1);
        return this;
    }
    layers() {
        return this._layers;
    }
    parentView() {
        return this._parentView;
    }
    parentViewSet(value) {
        var layers = this.layers();
        layers.forEach(x => x.parentViewSet(value));
        return this;
    }
}

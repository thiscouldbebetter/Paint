
class LayerGroup
{
	_layers: Layer[];
	_parentView: View;

	constructor(layers: Layer[])
	{
		this._layers = layers;
	}

	static fromSize(size: Coords): LayerGroup
	{
		return new LayerGroup
		(
			[
				Layer.fromNameAndSize("Layer0", size)
			]
		);
	}

	layerAdd(layer: Layer): LayerGroup
	{
		this._layers.push(layer);
		return this;
	}

	layerAtIndex(index: number): Layer
	{
		return this._layers[index];
	}

	layerInsertAtIndex(layer: Layer, index: number): LayerGroup
	{
		this._layers.splice(index, 0, layer);
		return this;
	}

	layerRemoveAtIndex(index: number): LayerGroup
	{
		this._layers.splice(index, 1);
		return this;
	}

	layers(): Layer[]
	{
		return this._layers;
	}

	parentView(): View
	{
		return this._parentView;
	}

	parentViewSet(value: View): LayerGroup
	{
		var layers = this.layers();
		layers.forEach(x => x.parentViewSet(value) );
		return this;
	}
}
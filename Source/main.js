function main()
{
	var view = new View
	(
		new Coords(320, 240), // size
		"Paint", // toolNameInitial
		[
			new ToolFile(),
			new ToolViewSize(),
			new ToolBrushSize(),
			new ToolColorPalette(),
			new ToolLayers(),
			new ToolPaint(),
			new ToolFill(),
			new ToolSelect(),
		]
	);

	document.body.appendChild
	(
		view.controlUpdate().domElementUpdate()
	);
}


class Display
{
	size: Coords;

	canvas: any;
	graphics: any;

	constructor(size: Coords)
	{
		this.size = size;
	}

	initialize(): void
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.size.x;
		canvas.height = this.size.y;
		canvas.style.cursor = "crosshair";
		canvas.style.backgroundImage = 
			"url('" + View.imageURLForAlphaZeroBuild() + "')";

		this.canvas = canvas;
		this.graphics = canvas.getContext("2d");
	}

	sizeSet(sizeToSet: Coords): void
	{
		this.size = sizeToSet;

		var canvasNew = document.createElement("canvas");
		canvasNew.width = this.size.x;
		canvasNew.height = this.size.y;

		var graphicsNew = canvasNew.getContext("2d");
		graphicsNew.drawImage(this.canvas, 0, 0);

		this.canvas.width = canvasNew.width;
		this.canvas.height = canvasNew.height;

		this.graphics.drawImage(canvasNew, 0, 0);
	}

	// drawing

	clear(): void
	{
		this.clearRectangle(Coords.Instances().Zeroes, this.size);
	}

	clearLine(startPos: Coords, endPos: Coords, width: number): void
	{
		var g = this.graphics;

		var displacement = endPos.clone().subtract(startPos);
		var distance = displacement.magnitude();
		var widthHalf = width / 2;
		var centerPos = Coords.create();
		for (var t = 0; t < distance; t++)
		{
			var fractionOfWayFromStartToEnd = t / distance;
			centerPos
				.overwriteWith(displacement)
				.multiplyScalar(fractionOfWayFromStartToEnd)
				.add(startPos);
			g.clearRect
			(
				centerPos.x - widthHalf, centerPos.y - widthHalf,
				width, width
			)
		}
	}

	clearRectangle(pos: Coords, size: Coords): void
	{
		this.graphics.clearRect
		(
			pos.x, pos.y, size.x, size.y
		);
	}

	drawOther
	(
		other: Display,
		pos: Coords,
		sourcePos: Coords,
		sourceSize: Coords
	): void
	{
		if (sourcePos == null)
		{
			this.graphics.drawImage(other.canvas, pos.x, pos.y);
		}
		else
		{
			this.graphics.drawImage
			(
				other.canvas,
				sourcePos.x, sourcePos.y,
				sourceSize.x, sourceSize.y,
				pos.x, pos.y,
				sourceSize.x, sourceSize.y // target size
			);
		}
	}

	drawLine(startPos: Coords, endPos: Coords, color: Color, width: number): void
	{
		var g = this.graphics;

		g.strokeStyle = color.systemColor();
		g.lineWidth = width;
		g.lineCap = "round";
		g.beginPath();
		g.moveTo(startPos.x, startPos.y);
		g.lineTo(endPos.x, endPos.y);
		g.stroke();
	}

	drawRectangle(pos: Coords, size: Coords, colorFill: Color, colorBorder: Color): void
	{
		var g = this.graphics;

		if (colorFill != null)
		{
			g.fillStyle = colorFill.systemColor();
			g.fillRect(pos.x, pos.y, size.x, size.y);
		}

		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder.systemColor();
			g.strokeRect(pos.x, pos.y, size.x, size.y);
		}
	}
}

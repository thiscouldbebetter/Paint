
function Display(size)
{
	this.size = size;
}

{
	Display.prototype.initialize = function()
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

	Display.prototype.sizeSet = function(sizeToSet)
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

	Display.prototype.clear = function()
	{
		this.clearRectangle(Coords.Instances.Zeroes, this.size);
	}

	Display.prototype.clearRectangle = function(pos, size)
	{
		this.graphics.clearRect
		(
			pos.x, pos.y, size.x, size.y
		);
	}

	Display.prototype.drawOther = function(other, pos, sourcePos, sourceSize)
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

	Display.prototype.drawLine = function(startPos, endPos, color, width)
	{
		var graphics = this.graphics;

		graphics.strokeStyle = color.systemColor;
		graphics.lineWidth = width;
		graphics.lineCap = "round";
		graphics.beginPath();
		graphics.moveTo(startPos.x, startPos.y);
		graphics.lineTo(endPos.x, endPos.y);
		graphics.stroke();
	}

	Display.prototype.drawRectangle = function(pos, size, colorFill, colorBorder)
	{
		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill.systemColor;
			this.graphics.fillRect(pos.x, pos.y, size.x, size.y);
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder.systemColor;
			this.graphics.strokeRect(pos.x, pos.y, size.x, size.y);
		}
	}
}

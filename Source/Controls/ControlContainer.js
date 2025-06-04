
class ControlContainer
{
	constructor(name, children)
	{
		this.name = name;
		this.children = children;
	}

	childByName(name)
	{
		return this.children.find(x => x.name == name);
	}

	// DOM.

	domElementUpdate()
	{
		if (this.domElement == null)
		{
			var returnValue = document.createElement("div");
			returnValue.id = this.name;

			for (var i = 0; i < this.children.length; i++)
			{
				var child = this.children[i];
				var childAsDOMElement = child.domElementUpdate();

				returnValue.appendChild(childAsDOMElement);
			}

			this.domElement = returnValue;
		}

		for (var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];
			child.domElementUpdate();
		}

		return this.domElement;
	}
}

# YEAH honestly

```js
function isValidHex(color) {
	if (!color || typeof color !== "string") return false;

	if (color.substring(0, 1) === "#") color = color.substring(1);

	switch (color.length) {
		case 3:
			return /^[0-9A-F]{3}$/i.test(color);
		case 4:
			return /^[0-9A-F]{4}$/i.test(color);
		case 6:
			return /^[0-9A-F]{6}$/i.test(color);
		case 8:
			return /^[0-9A-F]{8}$/i.test(color);
		default:
			return false;
	}

	return false;
}

Array.prototype.findArray = function (needle) {
	for (let i = 0; i < this.length; i++) {
		if (JSON.stringify(needle) == JSON.stringify(this[i])) {
			return i;
		}
	}
	return false;
};

Array.prototype.remove = function (index) {
	return this.splice(index, 1);
};
function isValidHex(color) {
	if (!color || typeof color !== "string") return false;

	if (color.substring(0, 1) === "#") color = color.substring(1);

	switch (color.length) {
		case 3:
			return /^[0-9A-F]{3}$/i.test(color);
		case 4:
			return /^[0-9A-F]{4}$/i.test(color);
		case 6:
			return /^[0-9A-F]{6}$/i.test(color);
		case 8:
			return /^[0-9A-F]{8}$/i.test(color);
		default:
			return false;
	}

	return false;
}

Array.prototype.findArray = function (needle) {
	for (let i = 0; i < this.length; i++) {
		if (JSON.stringify(needle) == JSON.stringify(this[i])) {
			return i;
		}
	}
	return false;
};

Array.prototype.remove = function (index) {
	return this.splice(index, 1);
};
```

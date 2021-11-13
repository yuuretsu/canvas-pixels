'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class ExtendedImageData extends ImageData {
    constructor(width, height) {
        super(width, height);
    }
    _getPointer(x, y) {
        return (x + y * this.width) * 4;
    }
    _getPointers(x, y) {
        const pointer = this._getPointer(x, y);
        return [
            pointer,
            pointer + 1,
            pointer + 2,
            pointer + 3,
        ];
    }
    setPixel(x, y, r, g, b, a) {
        const pointers = this._getPointers(x, y);
        this.data[pointers[0]] = r;
        this.data[pointers[1]] = g;
        this.data[pointers[2]] = b;
        this.data[pointers[3]] = a;
    }
    getPixel(x, y) {
        const pointers = this._getPointers(x, y);
        return [
            this.data[pointers[0]],
            this.data[pointers[1]],
            this.data[pointers[2]],
            this.data[pointers[3]]
        ];
    }
}

class Pixels {
    constructor(width, height, pixelSize) {
        this.width = width;
        this.height = height;
        this._data = new ExtendedImageData(width, height);
        this.source = document.createElement('canvas');
        this.source.width = width;
        this.source.height = height;
        this.source.style.width = String(width * pixelSize) + "px";
        this.source.style.height = String(height * pixelSize) + "px";
        this.source.style.imageRendering = "pixelated";
        this._ctx = this.source.getContext('2d');
    }
    setPixel(x, y, r, g, b, a) {
        this._data.setPixel(x, y, r, g, b, a);
    }
    getPixel(x, y) {
        return this._data.getPixel(x, y);
    }
    update() {
        this._ctx.putImageData(this._data, 0, 0);
    }
    clear() {
        this._data = new ExtendedImageData(this.width, this.height);
        this._ctx.putImageData(this._data, 0, 0);
    }
}

exports.Pixels = Pixels;
//# sourceMappingURL=index.js.map

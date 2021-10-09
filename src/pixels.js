// @ts-check

class ExtendedImageData extends ImageData {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    super(width, height);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   */
  setPixel(x, y, r, g, b, a) {
    const pointer = (x + y * this.width) * 4;
    this.data[pointer] = r;
    this.data[pointer + 1] = g;
    this.data[pointer + 2] = b;
    this.data[pointer + 3] = a;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @returns {[number, number, number, number]}
   */
  getPixel(x, y) {
    const pointer = (x + y * this.width) * 4;
    return [
      this.data[pointer],
      this.data[pointer + 1],
      this.data[pointer + 2],
      this.data[pointer + 3]
    ];
  }
}

export default class Pixels {
  constructor(width, height, pixelSize) {
    /** @type {number} */
    this.width = width;
    /** @type {number} */
    this.height = height;
    this._data = new ExtendedImageData(width, height);
    /** @type {HTMLCanvasElement} */
    this.source = document.createElement('canvas');
    this.source.width = width * pixelSize;
    this.source.height = height * pixelSize;
    /** @type {CanvasRenderingContext2D} */
    this._ctx = this.source.getContext('2d');
    this._ctx.imageSmoothingEnabled = false;
    /** @type {HTMLCanvasElement} */
    this._innerCanvas = document.createElement('canvas');
    this._innerCanvas.width = width;
    this._innerCanvas.height = height;
    /** @type {CanvasRenderingContext2D} */
    this._innerCtx = this._innerCanvas.getContext('2d');
  }
  setPixel(x, y, r, g, b, a) {
    this._data.setPixel(x, y, r, g, b, a);
  }
  getPixel(x, y) {
    return this._data.getPixel(x, y);
  }
  update() {
    this._innerCtx.putImageData(this._data, 0, 0);
    this._ctx.drawImage(this._innerCanvas, 0, 0, this.source.width, this.source.height);
  }
  clear() {
    this._ctx.clearRect(0, 0, this.source.width, this.source.height);
  }
}

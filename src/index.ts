import { ExtendedImageData } from "./extended-image-data";

export class Pixels {
  readonly width: number;
  readonly height: number;
  private _data: ExtendedImageData;
  readonly source: HTMLCanvasElement;
  private readonly _ctx: CanvasRenderingContext2D;
  constructor(width: number, height: number, pixelSize: number) {
    this.width = width;
    this.height = height;
    this._data = new ExtendedImageData(width, height);
    this.source = document.createElement('canvas');
    this.source.width = width;
    this.source.height = height;
    this.source.style.width = String(width * pixelSize) + "px";
    this.source.style.height = String(height * pixelSize) + "px";
    this.source.style.imageRendering = "pixelated";
    this._ctx = this.source.getContext('2d')!;
  }
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
    this._data.setPixel(x, y, r, g, b, a);
  }
  getPixel(x: number, y: number) {
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

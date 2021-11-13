import { Rgba, RgbaPointers } from "./types";

export class ExtendedImageData extends ImageData {
  constructor(width: number, height: number) {
    super(width, height);
  }
  private _getPointer(x: number, y: number) {
    return (x + y * this.width) * 4;
  }
  private _getPointers(x: number, y: number): RgbaPointers {
    const pointer = this._getPointer(x, y);
    return [
      pointer,
      pointer + 1,
      pointer + 2,
      pointer + 3,
    ];
  }
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
    const pointers = this._getPointers(x, y);
    this.data[pointers[0]] = r;
    this.data[pointers[1]] = g;
    this.data[pointers[2]] = b;
    this.data[pointers[3]] = a;
  }
  getPixel(x: number, y: number): Rgba {
    const pointers = this._getPointers(x, y);
    return [
      this.data[pointers[0]]!,
      this.data[pointers[1]]!,
      this.data[pointers[2]]!,
      this.data[pointers[3]]!
    ];
  }
}

export default class Pixels {
  constructor(width: number, height: number, pixelSize: number);
  setPixel(
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a: number
  ): void;
  getPixel(
    x: number,
    y: number,
  ): [number, number, number, number];
  update(): void;
  clear(): void;
}
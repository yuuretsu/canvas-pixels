declare type Rgba = [number, number, number, number];

declare class Pixels {
    readonly width: number;
    readonly height: number;
    private _data;
    readonly source: HTMLCanvasElement;
    private readonly _ctx;
    constructor(width: number, height: number, pixelSize: number);
    setPixel(x: number, y: number, r: number, g: number, b: number, a: number): void;
    getPixel(x: number, y: number): Rgba;
    update(): void;
    clear(): void;
}

export { Pixels };

import { Rect, RectSize } from "@/common/rect";

export type FrameInfo = {
    fileName: string;
    name: string;
    width: number;
    height: number;
    price: number;
};

export class FrameDrawModel extends Rect {
    private _img: HTMLImageElement; 
    private _frameName: string;

    constructor(rect: RectSize, img: string, frameName?: string) {
        super(rect);
        this._img = new Image();
        this._img.src = img;
        this._frameName = frameName ?? 'fallbackName';
    }

    public getImage(): HTMLImageElement {
        return this._img;
    }
    public getName(): string {
        return this._frameName;
    }
}
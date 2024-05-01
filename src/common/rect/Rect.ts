import { Coordinates } from "../types";
import { IRect, RectSize } from "./types";

export class Rect implements IRect {
    private size: RectSize;

    constructor(size: RectSize) {
        this.size = size;
    }
    public getWidth(): number {
        return this.size.width;
    }

    public getHeight(): number {
        return this.size.height;
    }

    public getRatioWidthToHeight(): number {
        return this.size.width / this.size.height;
    }

    public getWidthCenter(): number {
        return this.size.width / 2;
    }

    public getHeightCenter(): number {
        return this.size.height / 2;
    }

    public get(): RectSize {
        return this.size;
    }

    public getCenter(): Coordinates {
        return {
            x: this.getWidthCenter(),
            y: this.getHeightCenter()
        };
    }
};

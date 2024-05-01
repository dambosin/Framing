import { Coordinates } from "../types";

export type RectSize = {
    width: number;
    height: number;
};

export interface IRect {
    getWidth(): number;
    getHeight(): number;
    getRatioWidthToHeight(): number;
    getWidthCenter(): number;
    getHeightCenter(): number;
    getCenter(): Coordinates;
    get(): RectSize;
}
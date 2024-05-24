import { framesData } from "@/common/frames";
import { Rect, RectSize } from "@/common/rect";
import { useEffect, useState } from "react";
import { FrameDrawModel } from "./types";

type useFrameProps = string[];

export function useFrame(frameNames: useFrameProps) {
    const [frames, setFrames] = useState<FrameDrawModel[] | null>(null);
    useEffect(() => {
        const newFrames = frameNames.map(frameName => {
            const frameData = framesData[frameName];
            return new FrameDrawModel({width: frameData.width, height: frameData.height}, frameData.fileName, frameData.name);
        });
        setFrames(newFrames);
    }, [frameNames.join(',')]);
    return frames ?? [];
}
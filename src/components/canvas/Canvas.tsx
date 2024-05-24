import React, { useEffect, useRef, useState } from 'react';
import { RectSize } from '@/common/rect';
import { Coordinates } from '@/common';
import { FrameModel } from '../frame-selector/types';
import { Rect } from '@/common/rect';
import {useFrame} from './hooks';
import { FrameDrawModel } from './types';

type CanvasProps = FrameModel;



export function Canvas(props: CanvasProps) {
    const center: Coordinates = {
        x: 200,
        y: 300,
    };

    const scale = 5;
    const [rect, setRect] = useState<Rect>(new Rect({width: props.rect.width * scale, height: props.rect.height * scale}));
    const frames = useFrame(props.frame); 
    // const frames = [];

    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if(!ref.current) {
            ref.current = document.getElementById('canvas') as HTMLCanvasElement;
        }
    }, []);

    function draw(ctx: CanvasRenderingContext2D, img: HTMLImageElement, frame: FrameDrawModel) {
        ctx.reset();
        ctx.clearRect(0,0, 400, 600);
        ctx.translate(center.x, center.y);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-rect.getWidthCenter(), -rect.getHeightCenter());
        ctx.lineTo(rect.getWidthCenter(), -rect.getHeightCenter());
        ctx.lineTo(rect.getWidthCenter(), rect.getHeightCenter());
        ctx.lineTo(-rect.getWidthCenter(), rect.getHeightCenter());
        ctx.lineTo(-rect.getWidthCenter(), -rect.getHeightCenter());
        ctx.closePath();
        ctx.clip();
        const {coordinates, size} = getFittingRect(center, new Rect({width: img.width, height: img.height}), rect);
        ctx.drawImage(img, coordinates.x - center.x, coordinates.y - center.y, size.width, size.height);
        ctx.restore();

        ctx.save();
        let width = rect.getWidth();
        let height = rect.getHeight();
        const numberOfEdges = 4;
        for (let i = 0; i < numberOfEdges; i++) {
            drawFrameSide(new Rect({width, height}), numberOfEdges, i);
            const temp = height;
            height = width;
            width = temp;
        }

        function clip(localRect: Rect, numberOfEdges = 4 ) {
                const delta = Math.tan(360 / numberOfEdges / 2 * Math.PI / 180) * frame.getHeightCenter();
                ctx.beginPath();
                ctx.moveTo(-localRect.getWidthCenter() - delta, -localRect.getHeightCenter() - frame.getHeightCenter());
                ctx.lineTo(localRect.getWidthCenter() + delta, -localRect.getHeightCenter() - frame.getHeightCenter());
                ctx.lineTo(localRect.getWidthCenter(), -localRect.getHeightCenter());
                ctx.lineTo(-localRect.getWidthCenter(), -localRect.getHeightCenter());
                ctx.lineTo(-localRect.getWidthCenter() - delta, -localRect.getHeightCenter() - frame.getHeightCenter());
                ctx.clip();
        }
        
        function drawFrameSide(localRect: Rect, numberOfEdges: number = 4, edge: number = 0) {
                ctx.save();
                const pos: Coordinates = {
                    x: -localRect.getWidthCenter() - frame.getWidth() / 2,
                    y: -localRect.getHeightCenter() - frame.getHeight() / 2
                }
                ctx.rotate(2 / numberOfEdges* edge * Math.PI );
                clip(localRect, numberOfEdges);
                while (pos.x < localRect.getWidthCenter() + frame.getWidth() / 2) {
                    ctx.drawImage(frame.getImage(), pos.x, pos.y, frame.getWidth() / 2, frame.getHeight() / 2);
                    pos.x += frame.getWidth() / 2;
                }
                ctx.restore();
        }
    }

    /**
     * Calculates the position of a rectangle that fully covers area of the other rectangle without squeezing.
     *
     * @param {Coordinates} center - The center of the rectangle that will be fitted in.
     * @param {Rect} rect1 - The rectangle that will be fitted .
     * @param {Rect} rect2 - The rectangle that will be fitted in.
     * @return {Coordinates}  An object containing the x and y coordinates of the top left corner of the fitted rectangle.
     * @return {RectSize} An object containing the width and height of the fitting rectangle.
     */
    function getFittingRect(center: Coordinates, rect1: Rect, rect2: Rect): {coordinates: Coordinates, size: RectSize} {
        let resultRect: Rect;
        if (rect1.getRatioWidthToHeight() <= rect2.getRatioWidthToHeight()) {
            resultRect =
                new Rect(
                    {
                        width: rect2.getWidth(), 
                        height: getHeightFromWidthAndRatio(rect2.getWidth(), rect1.getRatioWidthToHeight())
                    }
                );
        } else {    
            resultRect =
                new Rect(
                    {
                        width: getWidthFromHeightAndRatio(rect2.getHeight(), rect1.getRatioWidthToHeight()), 
                        height: rect2.getHeight(),
                    }
                );

        }
                
        return {
            coordinates: {
                x: center.x - resultRect.getWidthCenter(),
                y: center.y - resultRect.getHeightCenter(),
            },
            size: {
                ...resultRect.get(),
            }
        }
    } 

    function getHeightFromWidthAndRatio(width: number, ratio: number): number {
        return width / ratio;
    }

    function getWidthFromHeightAndRatio(height: number, ratio: number): number {
        return height * ratio;
    }

    useEffect(() => {
        if (ref.current && frames.filter(frame => frame)) {
            const ctx = ref.current.getContext('2d');
            if (ctx) {
                const reader = new FileReader();
                reader.onloadend = (event) => {

                    const img = new Image(); 
                    img.onload = () => frames.forEach((frame, i) => {
                        draw(ctx, img, frame);
                        console.log(`draw ${i} with frame`, frame.getName());
                        handelSave(frame.getName());
                    });
                    img.src = (event.target?.result ?? '') as string;
                }
                reader.readAsDataURL(props.image);
            }
        }
        console.log('useEffect');
    }, [ref.current, props.image, rect.getHeight(), rect.getWidth(), frames.join(',')]);

    useEffect(() => {
        setRect(new Rect({width: props.rect.width * scale, height: props.rect.height * scale}));
    }, [props.rect.height, props.rect.width])

    function handelSave(name: string = 'canvas') {
        if(ref.current) {
            const link = document.getElementById('link');
            if (link) {
                link.setAttribute('download', `${name}.jpg`);
                link.setAttribute('href', ref.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
                link.click();
            }
        }
    }

    return (
        <>
            <canvas id={'canvas'} width="400" height="600" style={{margin: 'auto', border: 'green 1px solid'}}></canvas>
            <a id={'link'}></a>
        </>
    )
}
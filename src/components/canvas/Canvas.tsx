import React, { useEffect, useRef, useState } from 'react';
import { RectSize } from '@/common/rect';
import { Coordinates } from '@/common';
import { FrameModel } from '../frame-selector/types';
import { Rect } from '@/common/rect';

type CanvasProps = FrameModel;

export function Canvas(props: CanvasProps) {
    const center: Coordinates = {
        x: 200,
        y: 300,
    };

    const stroke = 5;
    const scale = 5;
    const [rect, setRect] = useState<Rect>(new Rect({width: props.rect.width * scale, height: props.rect.height * scale}));
    const [frameWidth, setFrameWidth] = useState<number>(10);

    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if(!ref.current) {
            ref.current = document.getElementById('canvas') as HTMLCanvasElement;
        }
    }, []);

    function draw(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
        ctx.clearRect(0,0, 400, 600);
        const {coordinates, size} = getFittingRect(center, new Rect({width: img.width, height: img.height}), rect);
        ctx.drawImage(img, coordinates.x, coordinates.y, size.width, size.height);

        drawTopBar();

        drawLeftBar();

        drawRightBar();

        drawBottomBar();

        function drawBottomBar() {
            ctx.beginPath();
            ctx.moveTo(center.x + rect.getWidthCenter(), center.y + rect.getHeightCenter());
            ctx.lineTo(center.x - rect.getWidthCenter(), center.y + rect.getHeightCenter());
            ctx.lineTo(center.x - rect.getWidthCenter(), center.y + rect.getHeightCenter() - stroke);
            ctx.lineTo(center.x +   rect.getWidthCenter(), center.y + rect.getHeightCenter() - stroke);
            ctx.lineTo(center.x + rect.getWidthCenter(), center.y + rect.getHeightCenter());
            ctx.fillStyle = 'purple';
            ctx.fill();
        }

        function drawRightBar() {
            ctx.beginPath();
            ctx.moveTo(center.x + rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.lineTo(center.x + rect.getWidthCenter(), center.y + rect.getHeightCenter());
            ctx.lineTo(center.x + rect.getWidthCenter() - stroke, center.y + rect.getHeightCenter());
            ctx.lineTo(center.x + rect.getWidthCenter() - stroke, center.y - rect.getHeightCenter());
            ctx.lineTo(center.x + rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }

        function drawLeftBar() {
            ctx.beginPath();
            ctx.moveTo(center.x - rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.lineTo(center.x - rect.getWidthCenter(), center.y + rect.getHeightCenter());
            ctx.lineTo(center.x - rect.getWidthCenter() + stroke, center.y + rect.getHeightCenter());
            ctx.lineTo(center.x - rect.getWidthCenter() + stroke, center.y - rect.getHeightCenter());
            ctx.lineTo(center.x - rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.fillStyle = 'green';
            ctx.fill();
        }

        function drawTopBar() {
            ctx.beginPath();
            ctx.moveTo(center.x - rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.lineTo(center.x + rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.lineTo(center.x + rect.getWidthCenter(), center.y - rect.getHeightCenter() + stroke);
            ctx.lineTo(center.x - rect.getWidthCenter(), center.y - rect.getHeightCenter() + stroke);
            ctx.lineTo(center.x - rect.getWidthCenter(), center.y - rect.getHeightCenter());
            ctx.fillStyle = 'red';
            ctx.fill();
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
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            if (ctx) {
                const reader = new FileReader();
                reader.onloadend = (event) => {0

                    const img = new Image(); 
                    img.onload = () => draw(ctx, img);
                    img.src = (event.target?.result ?? '') as string;
                }
                reader.readAsDataURL(props.image);
            }
        }
    }, [ref.current, props.image, rect.getHeight(), rect.getWidth()]);

    useEffect(() => {
        setRect(new Rect({width: props.rect.width * scale, height: props.rect.height * scale}));
    }, [props.rect.height, props.rect.width])

    return (
        <canvas id={'canvas'} width="400" height="600" style={{margin: 'auto', border: 'green 1px solid'}}></canvas>
    )
}
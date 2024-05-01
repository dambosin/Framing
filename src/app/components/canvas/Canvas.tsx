import { FrameModel } from '@/components/frame-form/FrameForm';
import React, { useEffect, useRef, useState } from 'react';

type Rect = {
    width: number;
    height: number;
};

type CanvasProps = FrameModel;

export function Canvas(props: CanvasProps) {
    const center = {
        x: 200,
        y: 300,
    };

    const [rect, setRect] = useState<Rect>({width: props.rect.width * 5, height: props.rect.height * 5})
    const [frameWidth, setFrameWidth] = useState<number>(10);

    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if(!ref.current) {
            ref.current = document.getElementById('canvas') as HTMLCanvasElement;
        }
    }, []);

    function draw(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
        ctx.clearRect(0,0, 400, 600);
        ctx.drawImage(img, center.x - rect.width / 2, center.y - rect.height / 2, rect.width, rect.height);
        ctx.beginPath();
        ctx.moveTo(center.x - rect.width / 2, center.y - rect.height / 2);
        ctx.lineTo(center.x + rect.width / 2, center.y - rect.height / 2);
        ctx.lineTo(center.x + rect.width / 2 - frameWidth, center.y - rect.height / 2 + frameWidth);
        ctx.lineTo(center.x - rect.width / 2 + frameWidth, center.y - rect.height / 2 + frameWidth);
        ctx.lineTo(center.x - rect.width / 2, center.y - rect.height / 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(center.x - rect.width / 2, center.y - rect.height / 2);
        ctx.lineTo(center.x - rect.width / 2 + frameWidth, center.y - rect.height / 2 + frameWidth);
        ctx.lineTo(center.x - rect.width / 2 + frameWidth, center.y + rect.height / 2 - frameWidth);
        ctx.lineTo(center.x - rect.width / 2, center.y + rect.height / 2 );
        ctx.lineTo(center.x - rect.width / 2, center.y - rect.height / 2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(center.x + rect.width / 2, center.y - rect.height / 2);
        ctx.lineTo(center.x + rect.width / 2, center.y + rect.height / 2);
        ctx.lineTo(center.x + rect.width / 2 - frameWidth, center.y + rect.height / 2 - frameWidth);
        ctx.lineTo(center.x + rect.width / 2 - frameWidth, center.y - rect.height / 2 + frameWidth);
        ctx.lineTo(center.x + rect.width / 2, center.y - rect.height / 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(center.x + rect.width / 2, center.y + rect.height / 2);
        ctx.lineTo(center.x - rect.width / 2, center.y + rect.height / 2);
        ctx.lineTo(center.x - rect.width / 2 + frameWidth, center.y + rect.height / 2 - frameWidth);
        ctx.lineTo(center.x + rect.width / 2 - frameWidth, center.y + rect.height / 2 - frameWidth);
        ctx.lineTo(center.x + rect.width / 2, center.y + rect.height / 2);
        ctx.fillStyle = 'purple';
        ctx.fill();
    }

    useEffect(() => {
        if (ref.current) {
            console.log('ref.current', ref.current);
            const ctx = ref.current.getContext('2d');
            if (ctx) {
                console.log('ctx', ctx);
                const reader = new FileReader();
                reader.onloadend = (event) => {0

                    const img = new Image(); 
                    img.onload = () => draw(ctx, img);
                    img.src = (event.target?.result ?? '') as string;
                    console.log('img', img); 
                }
                reader.readAsDataURL(props.image);
            }
        }
    }, [ref.current, props.image, rect.height, rect.width]);

    useEffect(() => {
        setRect({width: props.rect.width * 5, height: props.rect.height * 5});
    }, [props.rect.height, props.rect.width])

    return (
        <canvas id={'canvas'} width="400" height="600" style={{margin: 'auto', border: 'green 1px solid'}}></canvas>
    )
}
import React, { useEffect, useRef, useState } from 'react';

type Rect = {
    width: number;
    height: number;
};

export function Canvas() {
    const center = {
        x: 1200,
        y: 500,
    };

    const [rect, setRect] = useState<Rect>({width: 500, height: 300})
    const [frameWidth, setFrameWidth] = useState<number>(10);

    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if(!ref.current) {
            ref.current = document.getElementById('canvas') as HTMLCanvasElement;
        }
    }, []);

    function draw(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
        ctx.drawImage(img, -400, 0);
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
                const img = new Image(); 
                img.addEventListener('load', () => draw(ctx, img));
                img.src = "canvas-bg.jpg";
                console.log('img', img); 
            }
        }
    }, [ref.current]);

    return (
        <canvas id={'canvas'} width="1500" height="1000" style={{margin: 'auto'}}></canvas>
    )
}
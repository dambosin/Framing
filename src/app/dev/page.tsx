'use client'
import { Canvas } from '@/components/canvas';
import React from 'react';

const formModel = {
    rect: {
        width: 20,
        height: 30
    },
    image: new File([], 'canvas-bg.jpg'),
    frame: ''
};

export default function DevPage() {


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Canvas {...formModel} />
        </div>
    )
}

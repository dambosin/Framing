'use client'
import React from 'react';
import { Canvas } from '../components/canvas/Canvas';

const formModel = {
    rect: {
        width: 20,
        height: 30
    },
    image: 'canvas-bg.jpg',
    frame: ''
};

export default function DevPage() {


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Canvas {...formModel} />
        </div>
    )
}

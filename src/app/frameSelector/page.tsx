"use client"
import React, { useState } from 'react';
import { FrameForm } from '@/components/frame-form';
import { FrameModel } from '@/components/frame-form/FrameForm';
import { Canvas } from '../components/canvas/Canvas';

export default function Page() {
    const [value, setValue] = useState({rect: {width: 20, height: 30}, image: new File([], ''), frame: ''});

    function handleChange(value: FrameModel) {
        setValue(value);
    }
    console.log(value);
    return (
        <div style={{maxWidth: '1200px', margin:'0 auto', display: 'flex', alignItems: 'center', height: '100%'}}>
            <FrameForm onChange={handleChange} value={value}/>
            <Canvas {...value}/>
        </div>
    );
}

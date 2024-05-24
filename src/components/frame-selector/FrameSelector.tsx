import React, { useState } from 'react';
import { FrameModel } from './types';
import { FrameForm } from '../frame-form';
import { Canvas } from '../canvas';

export function FrameSelector() {
    const [value, setValue] = useState<FrameModel>({rect: {width: 50, height: 70}, image: new File([], 'testImage.jpg'), frame: ['testFrame.jpg']});

    function handleChange(value: FrameModel) {
        setValue(value);
    }
    return (
        <div style={{maxWidth: '1200px', margin:'0 auto', display: 'flex', alignItems: 'center', height: '100%'}}>
            <FrameForm onChange={handleChange} value={value}/>
            <Canvas {...value}/>
        </div>
    );
}
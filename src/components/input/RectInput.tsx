import React from 'react';
import { InputProps, Rect } from './types';
import { NumberInput } from './NumberInput';

export function RectInput({id, value, onChange}: InputProps<Rect>) {

    function handleReverseClick() {
        onChange({width: value.height, height: value.width});
    }

    function handleHeightChange(height: number) {
        onChange({...value, height});
    }

    function handleWidthChange(width: number) {
        onChange({...value, width});
    }

    return (
        <>
            <NumberInput  id={id} value={value.width} onChange={handleWidthChange} />
            <img src="UNO-Reverse-Card-PNG-Images-HD.png" width={32} onClick={handleReverseClick} style={{marginTop: 'auto'}} />
            <NumberInput  id={id + '-height'} value={value.height} onChange={handleHeightChange} />
        </>
    );
} 
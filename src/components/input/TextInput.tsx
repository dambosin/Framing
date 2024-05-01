import React, { ChangeEvent, InputHTMLAttributes, useCallback } from 'react';
import { InputProps } from './types';

export function TextInput({value, onChange,...otherProps}: InputProps<string>) {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    }, [onChange])
    return (
        <input type="text" onChange={handleChange} value={value} {...otherProps} />
    )
}
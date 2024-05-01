import React, {FC, ReactNode} from 'react';
import { TextInput } from '../input/TextInput';
import { InputProps, Rect } from '../input/types';
import { NumberInput } from '../input/NumberInput';
import { RectInput } from '../input/RectInput';
import { FileInput } from '../input/FileInput';

type LabelProps = {
    direction?: 'row' | 'column';
    label: string | ReactNode;
    hideInput?: boolean;
}

function withLabel<T extends unknown = string>(WrappedInput:  FC<InputProps<T>>) {
    return function LabelHoc({label, direction = 'column', hideInput = false, ...otherProps}: InputProps<T> & LabelProps) {
        return (
            <div style={{display: 'flex', flexDirection: direction, gap: '5px'}}>
                <label htmlFor={otherProps.id}>{label}</label>
                <WrappedInput {...otherProps} hidden={hideInput}/>
            </div>
        )
    }
}

export const TextInputWithLabel = withLabel<string>(TextInput);
export const NumberInputWithLabel = withLabel<number>(NumberInput);
export const RectInputWithLabel = withLabel<Rect>(RectInput);
export const FileInputWithLabel = withLabel<File>(FileInput);

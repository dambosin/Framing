import React, { ChangeEvent, useEffect, useState } from 'react';
import { FileInputWithLabel, NumberInputWithLabel, RectInputWithLabel, TextInputWithLabel } from '../input-label/LabelHOC';
import { FrameModel } from '../frame-selector/types';
import { RectSize } from '@/common/rect';
import { framesData } from '@/common/frames';



type FrameFormProps = {
    value: FrameModel;
    onChange?: (value: FrameModel) => void;
}
export function FrameForm({value, onChange}: FrameFormProps) {
    const [rect, setRect] = useState<RectSize>(value.rect);
    const [image, setImage] = useState<File>(value.image);
    const [frame, setFrame] = useState<string[]>(value.frame);

    useEffect(() => {
        setRect(value.rect);
    }, [value.rect.width, value.rect.height])

    useEffect(() => {
        setImage(value.image);
    }, [value.image])

    useEffect(() => {
        setFrame(value.frame);
    }, [value.frame.join(',')])

    function handleRectChange(value: RectSize) {
        setRect(value);
    }

    function handleImageChange(value: File) {
        setImage(value);
    }

    function handleFrameChange (e: ChangeEvent<HTMLSelectElement>) {
        const options = e.target.options;
        if(options) {
            const res: string[] = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    res.push(options[i].value);
                }
            }
            setFrame([...res]);

        }
    }

    function handleSubmit() {
        if (onChange) {
            onChange({rect, image, frame});
        }
    }
 
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <FileInputWithLabel 
                id="frame-form-image"
                value={image}
                label={
                    <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center'}}>
                        <h2>Выбор файла</h2>
                        <img src="file-upload-icon.svg" width="64" height="64" style={{color: 'white'}}/>
                    </div>
                } 
                onChange={handleImageChange}
                hideInput
            />
            <RectInputWithLabel direction="row" label="Размер" id="frame-form-rect" value={rect} onChange={handleRectChange}/>
            {/* <TextInputWithLabel direction="row" label="Багетная рама" id="frame-form-frame" placeholder="Рама" value={frame} onChange={handleFrameChange}/> */}
            <label htmlFor='frame-form-frame'>Багетная рама</label>
            <select multiple id="frame-form-frame"  defaultValue={frame} onChange={handleFrameChange}>
                {Object.keys(framesData).map((frame) => 
                    <option key={framesData[frame].fileName} value={framesData[frame].fileName}>{framesData[frame].name}</option>)
                    }
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
import { Fab } from '@mui/material';
import { useState } from 'react';
import { SwatchesPicker } from 'react-color';
import { Colorize } from '@mui/icons-material';

interface ColorSelectProps {
    onChange: (color: string) => void
}

export default function ColorSelect(props: ColorSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (color: {hex: string}) => {
        props.onChange(color.hex);
    }

    return <>
        <Fab aria-label="like" onClick={() => setIsOpen(!isOpen)}>
            <Colorize />
        </Fab>

        {isOpen && <div style={{marginTop: 10, zIndex: 1}}>
                <SwatchesPicker height={150} onChange={ handleChange } />
            </div>}
    </>
}
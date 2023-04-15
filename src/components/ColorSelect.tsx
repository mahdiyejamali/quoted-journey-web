import { Fab } from '@mui/material';
import { useRef, useState } from 'react';
import { SwatchesPicker } from 'react-color';
import { Colorize } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setColor } from '@/store/slices/quoteSlice';
import styled from '@emotion/styled';
import useClickOutside from '@/hooks/useClickOutside';

const ColorSwatchWrapper = styled.div`
    margin-top: 10px;
    z-index: 1;
    position: absolute;
`;

export default function ColorSelect() {
    const [isOpen, setIsOpen] = useState(false);
    
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useClickOutside(ref, () => setIsOpen(false), buttonRef);

    const dispatch = useDispatch();
    const handleChange = (color: {hex: string}) => dispatch(setColor(color.hex));

    return <>
        <Fab color="primary" ref={buttonRef} aria-label="like" onClick={() => setIsOpen(!isOpen)}>
            <Colorize />
        </Fab>

        {isOpen && <ColorSwatchWrapper ref={ref}>
                <SwatchesPicker height={150} onChange={ handleChange } />
            </ColorSwatchWrapper>}
    </>
}
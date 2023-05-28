
import { selectFontSize, setFontSize } from '@/store/slices/quoteSlice';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

const SliderWrapper = styled.div`
    .font-size-slider {
        color: black;
        padding: 1rem 1rem 1rem 1rem;
        width: 85%;
    }
`;

export default function FontSizeSlider() {
    const fontSize = useSelector(selectFontSize);

    const dispatch = useDispatch();
    const handleChange = (_: any, value: number | number[]) => dispatch(setFontSize(value as number))

    return (
        <SliderWrapper>
            <Slider
                min={15}
                max={40}
                value={fontSize}
                aria-label="font-size"
                valueLabelDisplay="auto"
                onChange={handleChange}
                className='font-size-slider'
            />
        </SliderWrapper>
    );
}
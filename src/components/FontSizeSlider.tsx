
import { selectFontSize, setFontSize } from '@/store/slices/quoteSlice';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


interface FontSizeProps {
}

export default function FontSizeSlider(props: FontSizeProps) {
    const fontSize = useSelector(selectFontSize);

    const dispatch = useDispatch();
    const handleChange = (_: any, value: number | number[]) => dispatch(setFontSize(value as number))

    return (
        <Slider
            min={15}
            max={40}
            defaultValue={fontSize}
            aria-label="font-size"
            valueLabelDisplay="auto"
            className='font-size-slider'
            onChange={handleChange}
        />
    );
}
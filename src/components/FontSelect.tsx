
import { selectFontClassName, setFontClassName } from '@/store/slices/quoteSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Kalam, Caveat, Dancing_Script, Pacifico } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux';

const roboto = Kalam({
    weight: '700',
    style: ['normal'],
    subsets: ['latin'],
});
const caveat = Caveat({
    weight: '700',
    style: ['normal'],
    subsets: ['latin'],
});
const dancingScript = Dancing_Script({
    weight: '700',
    style: ['normal'],
    subsets: ['latin'],
});
const pacifico = Pacifico({
    weight: '400',
    style: ['normal'],
    subsets: ['latin'],
});

const FONTS_LIST = [
    {title: 'Roboto', value: roboto.className},
    {title: 'Caveat', value: caveat.className},
    {title: 'Dancing Script', value: dancingScript.className},
    {title: 'Pacifico', value: pacifico.className}
]

interface FontSelectProps {
}

export default function FontSelect(props: FontSelectProps) {
    const dispatch = useDispatch();
    const font = useSelector(selectFontClassName);
    const handleChange = (font: string) => dispatch(setFontClassName(font));

    return (
        <FormControl fullWidth>
            <InputLabel>Font</InputLabel>
            <Select
            labelId="font-select-label"
            value={font}
            label="Font"
            onChange={(event) => handleChange(event.target.value)}
            >
                {FONTS_LIST.map(item => <MenuItem key={item.title} value={item.value}>{item.title}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
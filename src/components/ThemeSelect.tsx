import { setSrcImage } from '@/store/slices/themeSlice';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import ThemeCard from './ThemeCard';

const THEMES = [
    '/bg-1.jpg',
    '/bg-2.jpg',
    '/bg-3.jpg',
    '/bg-4.jpg',
    '/bg-5.jpg',
    '/bg-6.jpg',
    '/bg-7.jpg',
    '/bg-8.jpg',
    '/bg-9.jpg',
    '/bg-10.jpg',
    '/bg-11.jpg',
    '/bg-12.jpg',
];

export default function ThemeSelect() {
    const dispatch = useDispatch();
    const handleSelect = (src: string) => dispatch(setSrcImage(src));

    return (
        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
            {THEMES.map(src => (
                <Grid key={src} item xs={6}>
                    <ThemeCard src={src} onClick={handleSelect} />
                </Grid>
            ))}
        </Grid>
    );
}
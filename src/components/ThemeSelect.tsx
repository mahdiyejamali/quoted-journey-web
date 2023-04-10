import { setSrcImage } from '@/store/slices/themeSlice';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import ThemeCard from './ThemeCard';

export default function ThemeSelect() {
    const dispatch = useDispatch();
    const handleSelect = (src: string) => dispatch(setSrcImage(src));

    return (
        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <ThemeCard src={'/bg-1.jpg'} onClick={handleSelect} />
            </Grid>
            <Grid item xs={6}>
                <ThemeCard src={'/bg-2.jpg'} onClick={handleSelect} />
            </Grid>
            <Grid item xs={6}>
                <ThemeCard src={'/bg-3.jpg'} onClick={handleSelect} />
            </Grid>
            <Grid item xs={6}>
                <ThemeCard src={'/bg-4.jpg'} onClick={handleSelect} />
            </Grid>
        </Grid>
    );
}
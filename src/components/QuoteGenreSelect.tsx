
import useFavorite from '@/hooks/useFavorites';
import { CUSTOM_QUOTES_GENRE, FAVORITE_QUOTES_GENRE, QUOTE_GARDEN_GENRES } from '@/providers/quotable';
import { selectQuotes } from '@/store/slices/customQuoteSlice';
import { selectQuoteGenre, setQuoteGenre } from '@/store/slices/quoteSlice';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function QuoteGenreSelect() {
    const dispatch = useDispatch();
    const {hasFavorites} = useFavorite();

    const selectedQuoteGenre = useSelector(selectQuoteGenre);
    const customQuotes = useSelector(selectQuotes);

    const handleChange = (quoteGenre: string) => dispatch(setQuoteGenre(quoteGenre));

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
            {QUOTE_GARDEN_GENRES.map(item => {
                const isSelected = selectedQuoteGenre == item;
                let isEnabled = true;
                if (item == FAVORITE_QUOTES_GENRE) {
                    isEnabled = hasFavorites();
                } else if (item == CUSTOM_QUOTES_GENRE) {
                    isEnabled = !!customQuotes.length;
                }

                return (
                    <Grid key={item} item xs={6}>
                        <Button
                            disabled={!isEnabled}
                            variant='outlined'
                            color='primary'
                            style={{width: '9rem', padding: '15px', color: isEnabled ? 'black' : 'grey', ...(isSelected ? {backgroundColor: '#4DD0E1'} : {})}}
                            onClick={() => handleChange(item)}
                        >{item.charAt(0).toUpperCase() + item.slice(1)}</Button>
                    </Grid>
                );
            })}
        </Grid>
    );
}

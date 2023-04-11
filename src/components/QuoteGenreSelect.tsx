
import { QUOTE_GARDEN_GENRES } from '@/providers/quotable';
import { selectQuoteGenre, setQuoteGenre } from '@/store/slices/quoteSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function QuoteGenreSelect() {
    const dispatch = useDispatch();
    const quoteGenre = useSelector(selectQuoteGenre);
    const handleChange = (quoteGenre: string) => dispatch(setQuoteGenre(quoteGenre));

    return (
        <FormControl fullWidth>
            <InputLabel>Quote Genre</InputLabel>
            <Select
            labelId="quote-genre-select-label"
            value={quoteGenre}
            label="Quote Genre"
            onChange={(event) => handleChange(event.target.value)}
            >
                {QUOTE_GARDEN_GENRES.map(item => <MenuItem key={item} value={item}>{item.toUpperCase()}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
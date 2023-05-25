import { Button, FormControl, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardEventHandler, useState } from 'react';
import { selectQuotes, addQuote } from '@/store/slices/customQuoteSlice';

export default function CustomQuoteForm() {
    const [quote, setQuote] = useState('');
    const dispatch = useDispatch();
    const quotes = useSelector(selectQuotes);
    
    const handleSave = () => {
        dispatch(addQuote(quote));
        setQuote('');
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Enter') {
            console.log('do validate', quote);
            if (!!quote) {
                handleSave();
            }
        }
    }

    return (
        <FormControl fullWidth>
            <TextField 
                variant="outlined" 
                size="small" 
                label="Custom Quote" 
                value={quote} 
                onChange={(event) => setQuote(event.target.value)} 
                onKeyDown={handleKeyDown}
            />
            <Button 
                disabled={!quote} 
                style={{marginTop: 5}} 
                variant="contained" 
                onClick={handleSave}
            >Save Quote</Button>
        </FormControl>
    )
}
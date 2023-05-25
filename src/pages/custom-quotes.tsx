import { Card, CardActions, CardContent, Fab, Grid, Typography } from "@mui/material";
import styled from '@emotion/styled';
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuote, selectQuotes } from "@/store/slices/customQuoteSlice";
import CustomQuoteForm from "@/components/CustomQuoteForm";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    margin: 9% 5% 5% 5%;
`;

const ButtonsWrapper = styled.div`
    position: relative;
    bottom: 20%;
    left: 2%;
    display: flex;
    width: 60%;
`;

export default function CustomQuotesPage() {
    const dispatch = useDispatch();
    const quotes = useSelector(selectQuotes);
    const [isEmpty, setIsEmpty] = useState(false);
    const [customQuotes, setCustomQuotes] = useState<string[]>([]);

    useEffect(() => {
        setIsEmpty(!quotes.length);
        setCustomQuotes(quotes);
    }, [quotes]);

    return (
        <Wrapper>
            <div style={{paddingTop: "40px"}}>
                <CustomQuoteForm />
            </div>

            {isEmpty && 
                <Typography variant="h6" component="h2" paddingTop="20px">
                    Your custom quotes list is empty.
                </Typography>
            }

            {!isEmpty && <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} paddingTop="20px">
                {customQuotes.map((quote) => (
                    <Grid item xs={2} sm={4} md={4} key={quote}>
                        <Card sx={{ maxWidth: '100%', backgroundColor: '#EBDEF0' }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {quote}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ButtonsWrapper>
                                    <Fab size="small" aria-label="download" onClick={async (event) => {
                                        event.stopPropagation();
                                        dispatch(deleteQuote(quote));
                                    }}>
                                        <Delete />
                                    </Fab>
                                </ButtonsWrapper>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>} 
        </Wrapper>
    )
}

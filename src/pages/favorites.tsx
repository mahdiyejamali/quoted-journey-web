import hooks from "@/hooks";
import { Card, CardActions, CardMedia, Fab, Grid, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import styled from '@emotion/styled';
import { Delete, Download } from "@mui/icons-material";

const Wrapper = styled.div`
    margin: 5%;
`;

const ButtonsWrapper = styled.div`
    position: relative;
    bottom: 20%;
    left: 2%;
    display: flex;
    width: 60%;
`;

export default function FavoritesPage() {
    const {getUserFavoriteImages, downloadImage, deleteImage} = hooks.useFirestore();
    const [favoriteImages, setFavoriteImages] = useState<DocumentData[]>([]);
    const [showEmptyText, setShowEmptyText] = useState(false);
    
    const fetchData = useCallback(async () => {
        const data = await getUserFavoriteImages();
        setFavoriteImages(data);
        if (!data.length) {
            setShowEmptyText(true);
        }
    }, [getUserFavoriteImages]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Wrapper>
            {showEmptyText && 
                <Typography variant="h6" component="h2">
                    You have no images saved in Favotites.
                </Typography>
            }
            {!!favoriteImages.length && <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {favoriteImages.map((image) => (
                    <Grid item xs={2} sm={4} md={4} key={image.filename}>
                        <Card sx={{ maxWidth: '100%' }}>
                            <CardMedia
                                component="img"
                                alt=""
                                height="100%"
                                image={image.downloadURL}
                            />
                            <CardActions>
                                <ButtonsWrapper>
                                    <Fab size="small" aria-label="download" onClick={(event) => {
                                        event.stopPropagation();
                                        downloadImage(image.downloadURL)
                                    }}>
                                        <Download />
                                    </Fab>
                                    <Fab size="small" style={{marginLeft: 10}} aria-label="download" onClick={async (event) => {
                                        event.stopPropagation();
                                        await deleteImage(image.filename);
                                        fetchData();
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

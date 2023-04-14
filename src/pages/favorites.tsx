import hooks from "@/hooks";
import { Button, Card, CardActions, CardMedia, Grid, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from '@emotion/styled';

const Wrapper = styled.div`
    margin: 5%;
`;

export default function FavoritesPage() {
    const {getUserFavoriteImages, downloadImage} = hooks.useFirestore();
    const [favoriteImages, setFavoriteImages] = useState<DocumentData[]>([]);
    const [showEmptyText, setShowEmptyText] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserFavoriteImages();
            setFavoriteImages(data);
            if (!data.length) {
                setShowEmptyText(true);
            }
        }

        fetchData();
    }, []);

    return (
        <Wrapper>
            {showEmptyText && 
                <Typography variant="h6" component="h2">
                    There are no images saved in Favotites.
                </Typography>
            }
            {!!favoriteImages.length && <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {favoriteImages.map((image, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Card sx={{ maxWidth: '100%' }}>
                            <Button size="small" onClick={async () => {
                                downloadImage(image.downloadURL)
                            }}>
                            <CardMedia
                                component="img"
                                alt=""
                                height="100%"
                                image={image.downloadURL}
                            />
                            </Button>
                            {/* <CardActions>
                                <Button size="small" onClick={async () => {
                                    downloadImage(image.downloadURL)
                                }}>
                                    Download
                                </Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                ))}
            </Grid>}
            
        </Wrapper>
    )
}

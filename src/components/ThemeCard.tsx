import { Card, CardActionArea, CardMedia } from '@mui/material';

interface ThemeCardProps {
  src: string;
  onClick: (src: string) => void;
}

export default function ThemeCard(props: ThemeCardProps) {
    const {src, onClick} = props;
    return (
        <Card sx={{ maxWidth: '100rem' }} onClick={() => onClick(src)}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="120rem"
              image={src}
              alt="green iguana"
            />
            {/* <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent> */}
          </CardActionArea>
        </Card>
      );
}
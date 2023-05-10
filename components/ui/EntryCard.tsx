import { Card, CardActionArea, CardActions, Typography } from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {
    return (
        <Card
            sx={{ marginBottom: 1 }}
        >
            <CardActionArea sx={{ padding: 1 }}>
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                   {entry.description}
                </Typography>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2' >
                        Hace 20 minutos
                    </Typography>
                </CardActions>

            </CardActionArea>
        </Card>
    )
};

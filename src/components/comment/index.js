import { Paper, Stack, Typography } from "@mui/material";
import Avatar  from "components/Avatar";

export default function Comment({ name = '', body = ''}){
    return (
        <Stack direction="row" spacing={1} sx={{mb:2}}>
            <Avatar name={name} />
            <Paper elevation={4} sx={{ p: '8px 12px', borderRadius: 2.6, minWidth: 140, }}>
                <Typography sx={{ fontWeight: 600, fontSize: 13.5, textTransform: 'capitalize' }} variant="caption">{name}</Typography>
                <Typography variant="caption" paragraph sx={{mb: 0}}>
                    { body }
                </Typography>
            </Paper>
        </Stack>
    )
}


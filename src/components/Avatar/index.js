import {Avatar as Av} from '@mui/material';
const sx ={
    bgcolor: (t) => t.palette.primary.main,
    fontSize: 15,
    height: 25,
    width: 25,
}
export default function Avatar({ name }){
    if (name) {
        return (
            <Av sx={sx}>
                {name[0].toUpperCase()}
            </Av>
        );
    }
    return (
        <Av sx={sx} />
    );
}

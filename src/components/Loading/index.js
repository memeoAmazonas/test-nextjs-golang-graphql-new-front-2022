import {Card} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loading(){
    return (
        <Card elevation={0} sx={{ minHeight: 60, p: 1, mb: 1,}}>
            <Stack alignItems="center" spacing={1} direction="row">
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton width={`${35}%`} height={40} />
            </Stack>
        </Card>
    );
};


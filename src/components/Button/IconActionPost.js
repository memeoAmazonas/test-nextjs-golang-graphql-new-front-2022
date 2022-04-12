import { IconButton, Typography, Icon } from "@mui/material";
export default function CustomIconButton({ icon, title, onClick, extra }) {
    return(
        <IconButton onClick={onClick} color="primary" sx={{ borderRadius: 0, minWidth: '31%' }}>
            {extra && <Typography sx={{ fontWeight: "bold"}}>({extra})</Typography> }
            <Icon fontSize="small">{icon}</Icon>
            <Typography sx={{ ml: 0.3}}>{title}</Typography>
        </IconButton >
    );
}


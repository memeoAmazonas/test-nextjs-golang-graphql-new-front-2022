import { IconButton, Typography, Icon } from "@mui/material";
const CustomIconButton = ({ icon, title, onClick }) => (
    <IconButton onClick={onClick} color="primary" sx={{ borderRadius: 0, minWidth: '31%' }}>
        <Icon fontSize="small">{icon}</Icon>
        <Typography sx={{ ml: 0.3}}>{title}</Typography>
    </IconButton >
);

export default CustomIconButton;

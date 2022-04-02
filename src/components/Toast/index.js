import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Toast({ open=false, message, severity = 'success' }) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            severity="success"
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
}

export default Toast;

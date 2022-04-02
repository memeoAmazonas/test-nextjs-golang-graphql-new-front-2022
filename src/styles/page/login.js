const Classes = {
    cardContainer: {
        mt: '42vh',
        opacity: 0.5,
        p: 2,
        textAlign: "center"
    },
    title: {
        color: "primary",
        variant: "h5"
    },
    input: {
        fullWidth: true,
        sx: {
            mt: 1,
        },
        inputProps: {
            autoComplete: 'off',
            sx: {
                fontSize: 19,
                p: 1,
                textAlign: "center"
            }
        }
    },
    button: {
        color: (t) => t.palette.primary.main,
        border: (t) => "1px solid " + t.palette.primary.main,
        mt: 2,
        width: '120px',
        '&:hover': {
            bgcolor: (t) => t.palette.primary.main,
            color: (t) => t.palette.common.white,
            width: '140px',
        },
        transition: 'width: 0.8s, background-color: 0.7, color: 0.6s',
    }

}
export default Classes;

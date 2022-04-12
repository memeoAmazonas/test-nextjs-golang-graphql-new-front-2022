import {Link as L} from "@mui/material";
import * as React from "react";

export default function Link ({onClick, children }) {
    return(
        <L underline="none" sx={{ fontSize: 17, '&:hover':{
                fontSize: 19,
            },
            transition: 'font-size 0.3s',
        }} component="button" onClick={onClick}>{ children }</L>
    )
}

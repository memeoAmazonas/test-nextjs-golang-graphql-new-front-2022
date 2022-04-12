import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'

import useScrollTrigger from '@mui/material/useScrollTrigger';
import logo from '/public/logo.jpeg';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "components/Avatar";
import Link from "components/Button/Link";

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
export default function Header({ props }){
    const show = false;
/*    const { name, loading, loginLoading } = Selector(NAMESPACES.USER)
    const onLogout =() => {
        dispatch(logout())
        router.push("/");
    }
    const show = name && ([loading, loginLoading].includes(HTTP_STATUS.FULFILLED));*/
    const onLogout = () =>{}
    return(
        <ElevationScroll {...props}>
            <AppBar sx={{ height: 60 }} color="secondary">
                <Toolbar sx={{display: 'flex'}}>
                    <Image src={logo} alt="logo" layout="fixed" width={40} height={40} className="rounded-full"
                           quality={100}/>
                    <Typography variant="h5" sx={{ pl:1, pr:1, color:(t) =>t.palette.common.white}}>Marawaka</Typography>
                    {show && <Stack  direction="row" sx={{flexGrow: 1}} alignItems="center" justifyContent="flex-end">
                        <Avatar name={name} />
                        <Typography variant="h6" sx={{pl: 1, pr: 1, color: (t) => t.palette.common.white}}>
                            {name}
                        </Typography>
                        <Link onClick={onLogout}>Logout</Link>
                    </Stack>
                    }
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
}


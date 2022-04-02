import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Content from "components/Content";
import Link from "components/Button/Link";
import Toast from "components/Toast";


import Classes from "styles/page/login";
import {useLazyQuery, useQuery} from "@apollo/client";
import {CREATE_USER, LOGGED, LOGIN} from "../../graphql/query/user";
import {useRouter} from "next/router";
import React from "react";
import {isLength} from "validator";
import client from "../../graphql/client";

export default function Login() {
    const {data: user} = useQuery(LOGGED)
    const router = useRouter();

    React.useEffect(()=>{
        if (user) router.push("/home")
    },[router, user]);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [register, setRegister] = React.useState(false);

    const [msg, setMsg] = React.useState('Invalid email/username');
    const [open, setOpen] = React.useState(false);
    const [sv, setSv] = React.useState('error');

    const [toRegister, {}] = useLazyQuery(CREATE_USER, {
        variables: {
            input: {
                name,
                email
            }
        },
    });
    const [toLogin, {}] = useLazyQuery(LOGIN, {
        variables: {
            email,
        },
    });

    React.useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => {
                setOpen(false);
            }, 4500);
            return () => clearTimeout(timeout);
        }
        return clearTimeout();
    }, [open]);

    const onChange = (e) => {
        const {value, name} = e.target;
        if (name === "email") {
            setEmail(value)
        } else {
            setName(value);
        }
    }

    const disabled = () => {
        if (register) {
            return !isLength(email, {min: 6}) || !isLength(name, {min: 4})
        }
        return !isLength(email, {min: 6})
    }

    const setData = (message) => {
        setOpen(true);
        setMsg(message);
        setSv('error');
    }

    async function onSend() {

        if (register) {
            try {
                const {data} = await toRegister();
                if (data) {
                    if (data.CreateUser === -2) {
                        setData('User is already registered.');
                    } else {
                        client.cache.writeQuery({
                            query: LOGGED,
                            data: {
                                name,
                                id: data.CreateUser,
                            }
                        });
                        router.push("/home");
                    }
                }
            } catch (e) {
                setData('An error has occurred, please try again later.');
            }
        } else {
            try {
                const { data } = await toLogin();
                if (data && data.GetUserByEmail) {
                    client.cache.writeQuery({
                        query: LOGGED,
                        data: {
                            name: data.GetUserByEmail.name,
                            id: data.GetUserByEmail.id,
                        }
                    });
                    router.push("/home")
                }else {
                    setData('Invalid email/username');
                }
            } catch (e) {
                setData('An error has occurred, please try again later.');
            }
        }
    }

    const onRegister = () => {
        setName('');
        setEmail('');
        setRegister(!register);
    }

    return(
        <Content>
            <Stack className="content-login">
                <Toast severity={sv} message={msg} open={open}/>
                <Card sx={Classes.cardContainer}>
                        <Typography {...Classes.title}>Welcome to Duida Marawaka</Typography>

                        <TextField
                            name="email"
                            onChange={onChange}
                            placeholder="email/username"
                            value={email}
                            { ...Classes.input}
                        />
                        {register && <TextField
                            name="name"
                            onChange={onChange}
                            placeholder="name"
                            value={name}
                            {...Classes.input}
                        />}
                        <Button
                            onClick={onSend}
                            disabled={disabled()}
                            sx={Classes.button}>
                            {!register ? 'Login' : 'Signup'}
                        </Button>
                        <Stack direction="row" sx={{pt: 1}}>
                            <Link onClick={onRegister}>
                                {register ? "Log in" : "Signup"}
                            </Link>
                        </Stack>
                    </Card>
            </Stack>
        </Content>
    );
}

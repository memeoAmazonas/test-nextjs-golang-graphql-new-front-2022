import Content from "components/Content";
import React from "react";
import {CREATE_POST, GET_ALL_POST, LOCAL_POST} from "graphql/query/post";
import {useLazyQuery, useQuery} from "@apollo/client";
import Loading from "components/Loading";
import {v4 as uuid} from 'uuid';
import Post from "components/Post";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import {LOGGED} from "graphql/query/user";
import Create from "components/comment/Create";
import Stack from "@mui/material/Stack";
import Avatar from "components/Avatar";
import client from "../../graphql/client";

export default function Home() {
    const {data: user } = useQuery(LOGGED);
    const{ data: localPost } =useQuery(LOCAL_POST);
    const router = useRouter();
    React.useEffect(()=>{
        if (!user) router.push("/");
    },[user, router])
    const {data, error, loading} = useQuery(GET_ALL_POST, {
        pollInterval: 500,
    });
    const [onCreate,{}] = useLazyQuery(CREATE_POST);
    const OnCreatePost = async (body) =>{
        try {
            const {data: localData } = await onCreate({
                variables:{
                    input:{
                        userId: user.id,
                        nameUser: user.name,
                        body,
                    }
                }
            });
            const actual = localPost ? [...localPost.localPost, localData.CreatePost ] : [localData.CreatePost];
            client.cache.writeQuery({
                query: LOCAL_POST,
                data: {
                    localPost: actual
                }
            });

        }catch (e) {
            console.log(e)
        }
    }

    if (loading) {
        return (
            <Content>
                <Stack className="content-login">
                {Array.from(Array(3).keys()).map(() => (<Loading key={uuid()}/>))}
                </Stack>
            </Content>
        )
    }
     if (data) {
         const list = localPost ? (localPost.localPost).concat(data.Posts) : data.Posts;
            return (
                <Content>
                    <Card elevation={2} sx={{minHeight: 100, pt: 0, mb: 1.6, bgcolor: (t) => t.palette.bgView.main}}>
                    <Stack sx={{p: 2}} direction="row" spacing={1}>

                        <Avatar name={name}/>
                    <Create placeholder={`What's on your mind, ${user.name}?`} onCreate={(value) => OnCreatePost(value)} />
                    </Stack>
                    </Card>
                    {list.map((item) => (
                            <Post
                                author={item.user.name}
                                body={item.body}
                                title={item.title}
                                key={uuid()}
                                id={item.id.toString()}
                                quantity={item.comments}
                                name={user ? user.name : ""}
                            />
                        )
                    )}
                </Content>
            );
        }
    if (error) {
        return (
            <Content>
                <Card elevation={3} sx={{display: "flex", justifyContent:"center", alignItems:"center", p:1, minHeight: 100, mt:'25vh'}}>
                <Typography variant="h5" color="error">An error occurred, please try again later</Typography>
                </Card>
            </Content>
        )

    }
    return null
}


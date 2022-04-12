import React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "components/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useLazyQuery, useQuery} from "@apollo/client";
import {ADD_COMMENT, GET_COMMENT_BY_ID} from "../../graphql/query/comment";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Buttons from "./Buttons";
import Loading from "../Loading";
import Comment from "../comment";
import {v4 as uuid} from 'uuid';
import Create from "../comment/Create";
import {CREATE_LIKE} from "../../graphql/query/like";
import {LOCAL_POST} from "../../graphql/query/post";
import client from "../../graphql/client";

export default function Post({author, title, body, id, quantity, name, userId, likes}){

    const [getComment, {data, loading}] = useLazyQuery(GET_COMMENT_BY_ID, {
        fetchPolicy: "network-only",
        variables: {id},
    });
    const [focus, setFocus] = React.useState('');
    const [createComment, {}] = useLazyQuery(ADD_COMMENT)
    const [createLike, {}] = useLazyQuery(CREATE_LIKE);
    const [open, setOpen] = React.useState(false);
    const{ data: localPost } =useQuery(LOCAL_POST);

    const onClick = () => {
        setOpen(!open);
        getComment();
    }
    const onCreate = (value) => {

        createComment({
                variables: {
                    input: {
                        body: value,
                        name,
                        postId: id,
                    }
                },
            },
        ).then(() => getComment())
    };
    const numComment = data && data.CommentByPost ? data.CommentByPost.length : quantity;
    React.useEffect(() => {
        if (!open) setOpen(true);
    }, [numComment])
    const onClickComment = () => setFocus(!focus);
    const onLike = async () => {
      const { data: as } = await createLike({
            variables: {
                input:
                    {
                        userId,
                        postId: id,
                    }
            }
        });
      let sum = 1;
      if (as["CreateLike"].includes("delete")){
       sum =-1;
      }
      const actPost =  localPost.localPost.map((item)=>{
          if (Number(id) === item.id) {
                return { ...item, likes : item.likes + sum }
          }
          return  { ...item }
      });
        client.cache.writeQuery({
            query: LOCAL_POST,
            data: {
                localPost: actPost
            }
        });
    }
    return (
        <Card elevation={2} sx={{minHeight: 120, pt: 0, mb: 1.6, bgcolor: (t) => t.palette.bgView.main}}>
            <CardHeader
                avatar={<Avatar name={author}/>}
                title={title}
                subheader={author}
            />
            <CardContent>
                <Typography variant="body2">
                    {body}
                </Typography>
            </CardContent>
            {numComment > 0 &&
            <Stack alignItems="flex-end" sx={{pr: 1.6, pb: 1}}>
                <Link
                    underline="hover"
                    component="button"
                    variant="body2"
                    onClick={onClick}
                >
                    {numComment} comments
                </Link>
            </Stack>
            }

            <Buttons onFocus={onClickComment} likes={likes} onLike={onLike}/>
            {open && loading && Array.from(Array(numComment).keys()).map(() => <Loading key={uuid()}/>)}
            {open && data && data.CommentByPost &&
            (<Stack sx={{p: 2}}>
                {data.CommentByPost.map((it) => (<Comment key={uuid()}  {...it}  />))}
            </Stack>)
            }
            <Stack sx={{p: 2}} direction="row" spacing={1}>
                <Avatar name={name}/>
                <Create onCreate={(value) => onCreate(value)} focus={focus}/>
            </Stack>
        </Card>
    );
}

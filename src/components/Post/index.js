import React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "components/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useLazyQuery } from "@apollo/client";
import {ADD_COMMENT, GET_COMMENT_BY_ID} from "../../graphql/query/comment";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Buttons from "./Buttons";
import Loading from "../Loading";
import Comment from "../comment";
import {v4 as uuid} from 'uuid';
import Create from "../comment/Create";

const Post = ({author, title, body, id, quantity, name}) => {

    const [getComment, {data, loading}] = useLazyQuery(GET_COMMENT_BY_ID, {
        fetchPolicy: "network-only",
        variables: {id},
    });
    const [focus, setFocus] = React.useState('');
    const [createComment, {}] = useLazyQuery(ADD_COMMENT)
    const [open, setOpen] = React.useState(false);
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
        <Buttons onFocus={()=>setFocus(!focus)}/>
        {open && loading && Array.from(Array(numComment).keys()).map(() => <Loading key={uuid()}/>)}
        {open && data && data.CommentByPost &&
        (<Stack sx={{p: 2}}>
            {data.CommentByPost.map((it) => (<Comment key={uuid()}  {...it}  />))}
        </Stack>)
        }
        <Stack sx={{p: 2}} direction="row" spacing={1}>
            <Avatar name={name}/>
            <Create onCreate={(value) => onCreate(value)} focus={focus} />
        </Stack>
    </Card>
);
}

export default Post;

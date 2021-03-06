import React from 'react';
import {Divider, Stack} from "@mui/material";
import IconButton from "components/Button/IconActionPost";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

export default function Buttons({onFocus, likes, onLike}){
    return (
        <Stack sx={{pb: 1}}>
            <Divider color="primary" sx={{mb: 1}}/>
            <Stack justifyContent="center" direction="row" spacing={2}>
                <IconButton
                    extra={likes}
                    title="Like"
                    icon={<ThumbUpIcon fontSize="small"/>}
                    onClick={onLike}
                />
                <IconButton title="Comment"
                            icon={<ChatBubbleOutlineIcon/>}
                            onClick={onFocus}
                />
                <IconButton
                    title="Share"
                    icon={<ShareIcon fontSize="small"/>}
                    onClick={() => console.log('log')}
                />
            </Stack>
            <Divider color="primary" sx={{mt: 1}}/>
        </Stack>
    );
};


import {gql} from '@apollo/client';

const GET_COMMENT_BY_ID = gql`query($id: String!)  {
    CommentByPost(id: $id) {
        body
        email
        name
    }
}`
const ADD_COMMENT = gql`query ($input: NewComment!){
    CreateComment(input: $input)
}`
export { GET_COMMENT_BY_ID, ADD_COMMENT };

import {gql} from '@apollo/client';

const GET_ALL_POST = gql`
    query {
        Posts {
            id
            title
            body
            comments
            user {
                name
            }
        }
    }`;
const CREATE_POST = gql`query ($input: NewPost!){
    CreatePost(input: $input){
        user{
            name
            id
        }
        userId
        title
        body
        comments
        id
    }
}`
const LOCAL_POST = gql` query getCreatedPost {
            localPost @client
        }`
;

export {CREATE_POST, GET_ALL_POST, LOCAL_POST};

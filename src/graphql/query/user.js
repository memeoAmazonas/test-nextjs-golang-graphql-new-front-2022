import {gql} from '@apollo/client';

const CREATE_USER = gql`query ($input: NewUser!){
    CreateUser(input: $input)
}`

const LOGIN = gql`query ($email: String!){
    GetUserByEmail(email: $email){
        name
        id
    }
}`

const LOGGED = gql` query getActualUser {
        name @client
        id @client
    }`
;

export { CREATE_USER, LOGIN, LOGGED }

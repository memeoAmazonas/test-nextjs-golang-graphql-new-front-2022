import {gql} from "@apollo/client";

const CREATE_LIKE = gql`query ($input:  NewLike!){
    CreateLike(input: $input)
}`

export { CREATE_LIKE }

import { gql } from '@apollo/client';

export const LOG_USER = gql`
    mutation logUser($email: String!, $password: String!) {
        logUser(email: $email, password: $password) {
            _id
            email
            password
        }
    }
`;

export const NEW_USER = gql`
    mutation newUser($username: String!, $email: String!, $password: String!) {
        newUser(username: $username, email: $email, password: $password) {
            _id
            username
            email
            password
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook($input: BookInput) {
        addBook(input: $BookInput) {
            title
            bookId
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        deleteBook(bookId: $ID!) {
            bookId
        }
    }
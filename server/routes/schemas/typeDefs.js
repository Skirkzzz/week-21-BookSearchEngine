const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
  }

  input addBook {
    authors: [String]
    description: String
    title: String
    bookId: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    newUser(username: String!, email: String!, password: String!): Auth
    addBook(input: addBook): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;

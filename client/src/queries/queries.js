import { gql } from '@apollo/client';

//Appolo setup
export const GET_AUTHORS_QUERY = gql`
  query GetAuthorsQuery {
    authors {
      name
      id
    }
  }
`;

export const GET_BOOKS_QUERY = gql`
  query GetBooksQuery {
    books {
      name
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query book($id: ID!) {
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`;
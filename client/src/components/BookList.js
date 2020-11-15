
import React, {useState} from 'react';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_BOOKS_QUERY, GET_BOOK_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';



function BookList() {
  const [selectedBook, setSelectedBook] = useState([]);

  const [getBook, { loading: bookLoading, error: bookError, data: bookData }] = useLazyQuery(GET_BOOK_QUERY);

 

  const { loading, error, data } = useQuery(GET_BOOKS_QUERY, {
    displayName: "GET_BOOKS_QUERY",
    // pollInterval: 500,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  return (
    <div>

      <ul id="book-list">
        {data.books.map((book)=>(
          <li key={book.id} onClick={() => getBook({ variables: { id: book.id } })}>{book.name}</li>
        ))}
      </ul>

      <BookDetails selectedBook={bookData}/>
     
    </div>
  );
}

export default BookList;

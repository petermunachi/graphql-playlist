
import React, {useState} from 'react';
import { useQuery, useMutation, gql  } from '@apollo/client';
import { GET_AUTHORS_QUERY, ADD_BOOK, GET_BOOKS_QUERY } from '../queries/queries';


function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data, refetch  } = useQuery(GET_AUTHORS_QUERY,{
    displayName: "GET_AUTHORS_QUERY",
  });

  const [
    addBook,
    { loading: mutationLoading, error: mutationError },
  
  ] = useMutation(ADD_BOOK,  {
    update(cache, { data: { addBook } }) {
      cache.modify({
        fields: {
          todos(existingBooks = []) {
            const newBookRef = cache.writeFragment({
              data: addBook,
              fragment: gql`
                fragment NewBooks on Books {
                  id
                  name
                  genre
                }
              `
            });
            return [...existingBooks, newBookRef];
          }
        }
      });
    },

    
  });
  

  if (error) return `Error! ${error.message}`;


  const onInputChangeHandler = (event) => {
    event.persist();

    let inputName = event.target.name;
    let inputText = event.target.value;

    if (inputName === 'name') setName(inputText);
    if (inputName === 'genre') setGenre(inputText);
    if (inputName === 'authorId') setAuthorId(inputText);
   
  }

  const submitForm = (e) =>{
    e.preventDefault();
    const postData = {name, genre, authorId};
    console.log(postData);
    addBook({ variables: { ...postData }, refetchQueries:[ {query: GET_BOOKS_QUERY}] });
    
  }

  let displayAuthors = null;

  if (loading) {
    displayAuthors = <option>Loading Authors...</option>;
  }else{
    displayAuthors = data.authors.map((author)=>(
      <option key={author.id} value={author.id}>{author.name}</option>
    ))
  }
    
  

  return (
    <div>
      <form id="add-book" onSubmit={submitForm}>

        <div className="field">
          <label>Book name:</label>
          <input type="text" value={name} name="name"  onChange={onInputChangeHandler}/>
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text" value={genre} name="genre"  onChange={onInputChangeHandler}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select defaultValue={authorId} name="authorId" onChange={onInputChangeHandler}>
            <option>Select Author</option>
            {displayAuthors}
          </select>
        </div>

        <button>+</button>

      </form>     
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
}

export default AddBook;

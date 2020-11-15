
function BookDetails({ selectedBook }) {


  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;


  return (
    <div className="book-details">
      <p>Output book details here</p>
      {console.log("bookDetails", selectedBook)}
      
      {
        selectedBook ? (
          <div>
            <h2>{selectedBook.book.name}</h2>
            <p>{selectedBook.book.genre}</p>
            <p>All books by this author:</p>
            <ul className="other-name">
              {selectedBook.book.author.books.map(item=>{
                return <li key={item.id}>{item.name}</li>
              })}
            </ul>
          </div>
        ) : <div>No book selected...</div>}

    </div>
  );
}

export default BookDetails;

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import BooksDisplayed from './BooksDisplayed'

class SearchBooks extends React.Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    booksResult: [],
    flagSearch: false
  };

  findBooks = async event => {
    try {
        const query = event.target.value;
        this.setState({ query });
        if (query) {
          const searchResults = await BooksAPI.search(query.trim())
          if(searchResults.error)
          {
            this.setState({ booksResult: [], flagSearch: true });
          }
          else {
             this.setState({ booksResult: searchResults, flagSearch: false })
          }
        }
        else {
          this.setState({ booksResult: [], flagSearch: false });
        }
    } catch(error)
      {
        console.log(error);
      }

  };
  
 render() {
   const query = this.state.query;
   const booksResult = this.state.booksResult;
   const mainPageBooks = this.props.bookList;
   return (
     <div className="search-books">
         <div className="search-books-bar">
             <Link to="/" className="close-search">close</Link>
             <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" value={query}
              onChange={this.findBooks}/>
             </div>
         </div>
         {booksResult.length > 0 && (
         <div className="search-books-results">
         <h1> Search returned {booksResult.length} books  </h1>
         {
           booksResult.map(book =>{
            const bookMatched = mainPageBooks.find(searchedBook => searchedBook.id === book.id);
            if(bookMatched)
              book.shelf = bookMatched.shelf;
            else
                book.shelf = 'none';
                return "";
           })
          }
            <BooksDisplayed books={this.state.booksResult} updateShelf={this.props.updateShelf}/>
         </div>)
       }
       {this.state.flagSearch && (
         <div className="search-books-results">
         <h1> No books  </h1>
       </div>)}
     </div>
   )
 }

}
export default SearchBooks

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import BooksDisplayed from './BooksDisplayed'

class SearchBooks extends React.Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired
  }
  state ={
    query: '',
    booksResult:[]
  }
  searchBook = (event) => {
    const searchValue = event.target.value;
    if (searchValue) {
      BooksAPI.search(searchValue.trim(),20).then(results => {
      this.setState({
        query:searchValue,
        booksResult: results
      });
    })
    }
    else {
      this.setState({
        booksResult: []
      });
    }

 }

 render() {
   const query = this.state.query;
   const booksResult = this.state.booksResult;
   return (
     <div className="search-books">
         <div className="search-books-bar">
             <Link to="/" className="close-search">close</Link>
             <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" value={query}
              onChange={this.searchBook}/>
             </div>
         </div>
         {booksResult.length === 0 && (
           <div className='error'>
             <span>No Books Found!</span>
           </div>
         )}
         <div className="search-books-results">
            <BooksDisplayed books={this.state.booksResult} updateShelf={this.props.updateShelf}/>
         </div>
     </div>
   )
 }

}
export default SearchBooks

import React from 'react'
import PropTypes from 'prop-types'
import BooksDisplayed from './BooksDisplayed'

class BookList extends React.Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  };

  render() {
    const allBooks = this.props.bookList;
    //console.log('all the books',allBooks);
    const category = [
       { shelf: 'currentlyReading', shelf_title: 'Currently Reading' },
       { shelf: 'wantToRead', shelf_title: 'Want to Read' },
       { shelf: 'read', shelf_title: 'Read' }
     ];
      return (
       <div className="list-books-content">
         {
           category.map((shelfType,index) => {
             //console.log('bookList '+allBooks);
           const books = allBooks.filter(book => book.shelf === shelfType.shelf);
             return (
                 <div className="bookshelf" key={index}>
                   <h2 className="bookshelf-title">{shelfType.shelf_title}</h2>
                   <div className="bookshelf-books">
                     <BooksDisplayed books={books} updateShelf={this.props.updateShelf} />
                   </div>
                 </div>
             );
           })
       }
       </div>
   );
  } // end of render
}
export default BookList

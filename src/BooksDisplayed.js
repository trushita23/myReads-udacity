import React from 'react'
class BooksDisplayed extends React.Component {
  render()
  {
    const bookInfo = this.props.books;
    return(
      <ol className="books-grid">
      {bookInfo.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={event => this.props.updateShelf(book, event.target.value)} >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">Harper Lee</div>
          </div>
        </li>
      ))}
      </ol>
    );
  }
}
export default BooksDisplayed

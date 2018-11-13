import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookList from './BookList'

import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[]
  }
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books:books })
        console.log({books}); //DELETE THIS BEFORE SUBMITTING
      })

    }
    updateShelf = (currentBook,newShelf) => {
       const oldBookList = this.state.books;
       let newBookList = oldBookList.filter(b => b.id !== currentBook.id);
       currentBook.shelf = newShelf;
       newBookList.push(currentBook);
       BooksAPI.update(currentBook, newShelf).then(() => {
       this.setState({
        books: newBookList
      });
    })
  }

  render() {
    return (
      <div className="app">
      <Route path="/search" render ={() => (
        <SearchBooks  bookList={this.state.books} updateShelf ={this.updateShelf}/>
      )}/>
      <Route path="/" render = {() => (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                      <BookList bookList={this.state.books} updateShelf ={this.updateShelf}/>
                  </div>
                </div>
                <div className="open-search">
                   <Link to="/search">Add a book</Link>
               </div>
            </div>
          )}/>
    </div>
    )
  }
}

export default BooksApp

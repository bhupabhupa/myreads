import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import BookList from "./BookList/BookList";
import * as BooksAPI from './utils/BooksAPI';
import SearchBooks from './SearchBooks/SearchBooks';

class App extends Component {
    state = {
        books : []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        });
    }

    changeHandler = (book, shelf) => {
        BooksAPI.update(book, shelf).then((shelfs) => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books });
            });
        });
    }

  render() {
        const { books } = this.state;
    return (
        <div>
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <Route exact path="/" render={() => (
                <div className="list-books-content">
                    <BookList books={books} onStatusChange={this.changeHandler} title="Currently Reading" shelf="currentlyReading"/>
                    <BookList books={books} onStatusChange={this.changeHandler} title="Want to Read" shelf="wantToRead"/>
                    <BookList books={books} onStatusChange={this.changeHandler} title="Read" shelf="read"/>
                    <div  className="open-search">
                        <Link to="/search" />
                    </div>
                </div>
            )}/>
            <Route path="/search" render={() => (
                <SearchBooks books={books} onStatusChange={this.changeHandler}/>
            )}/>
        </div>
    );
  }
}

export default App;

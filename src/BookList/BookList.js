import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../App.css';
import * as BooksAPI from '../utils/BooksAPI';
import Book from "./Book/Book";

class BookList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired
    }

    changeHandler = (event, book) => {
        BooksAPI.update(book, event).then((books) => {
            this.setState({ ...books });
        });
    }


    render() {
        let books = this.props.books;

        const filterResult = books.filter((book) => book.shelf === this.props.shelf);
        return (
            <div className="bookshelf">
                <h1 className="bookshelf-title">{this.props.title}</h1>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {filterResult.map((book) => (
                            <li key={book.id}>
                                <Book book={book} onStatusChange={this.props.onStatusChange}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookList;
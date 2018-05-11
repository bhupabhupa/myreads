import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from "../BookList/Book/Book";
import * as BooksAPI from "../utils/BooksAPI";

class SearchBooks extends Component {
    state = {
        query : '',
        books: [],
        noResults : true
    };

    componentWillMount() {
        const books = this.props.books;
        this.setState({ books })
    }

    updateQuery = (query) => {
        this.setState({ query: query });
        if (query) {
            BooksAPI.search(query, 10).then( (books) => {
                if (books.error === 'empty query') {
                    this.setState({ noResults: true })
                    //console.log('No Results');

                } else {
                    this.setState({ noResults: false });
                    this.setState({ books })
                }
            })
        }
    }

    render() {
        const { query, books, noResults } = this.state;

        let bookList = [];
        if (query.trim().length > 0 && !noResults ) {
            const match = new RegExp(query, 'i');
            bookList = books.filter((book) => match.test(book.title))
        } else {
            bookList = [];
        }

        return (
            <div>
                <div className="search-books-bar">
                    <Link className="close-search" to="/"></Link>
                    <input
                        type='text'
                        placeholder='Search by title or author'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)} />

                </div>
                { bookList.length !== 0 && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {bookList.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} shelf={book.shelf} onStatusChange={this.props.onStatusChange}/>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        );
    }
}

export default SearchBooks;
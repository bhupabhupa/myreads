import React, { Component } from 'react';

class Book extends Component {
    state = {
        shelfOptions : ['currentlyReading', 'wantToRead', 'read', 'None']
    }
    render() {
        const { book, onStatusChange } = this.props;
        return (
            <div className="book">
                <img src={book.imageLinks.smallThumbnail} alt={book.title}/>
                <p className="book-title">{book.title}</p>
                <p className="book-authors">{book.authors}</p>
                <p className="book-authors">{book.shelf}</p>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf === undefined ? 'None' : book.shelf} onChange={(event) => onStatusChange(book, event.target.value)}>
                        <option disabled>Move to...</option>
                        {
                            this.state.shelfOptions.map((shelfOption) => (
                                <option key={shelfOption} value={shelfOption} >{shelfOption}</option>
                            ))
                        }
                        </select>
                </div>
            </div>
        )
    }
}

export default Book;
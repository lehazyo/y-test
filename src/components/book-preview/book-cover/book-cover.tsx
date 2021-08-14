import React from 'react';
import './book-cover.scss';

export interface BookCoverProps {
  title: string;
  cover_i: number;
}

export interface BookCoverState {
  isLoading: boolean;
}

export class BookCover extends React.Component<BookCoverProps, BookCoverState> {
  constructor(props: BookCoverProps) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  imageHasLoaded() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    return (
      <figure className={`book-cover book-cover--wrapper ${this.state.isLoading ? 'book-cover_loading' : ''}`}>
        <img
          alt={`Обложка книги ${this.props.title}`}
          src={`http://covers.openlibrary.org/b/id/${this.props.cover_i}-S.jpg`}
          onLoad={() => this.imageHasLoaded()}
        />
      </figure>
    )
  }
}

export default BookCover;

import React from 'react';
import './book-cover-image.scss';

export interface BookCoverImageProps {
  title: string;
  cover: number;
  details?: boolean;
}

export interface BookCoverImageState {
  isLoading: boolean;
}

export class BookCoverImage extends React.Component<BookCoverImageProps, BookCoverImageState> {
  constructor(props: BookCoverImageProps) {
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

  coverClassNames(): string {
    const coverClassNames = [
      'book-cover',
      'book-cover--wrapper',
    ];
    if (this.state.isLoading) {
      coverClassNames.push('book-cover_loading');
    }
    if (this.props.details) {
      coverClassNames.push('book-cover_details');
    }
    return coverClassNames.join(' ');
  }

  render() {
    const thumbSize = (this.props.details) ? 'L' : 'S';
    return (
      <figure className={this.coverClassNames()}>
        <img
          alt={`Обложка книги ${this.props.title}`}
          className="book-cover--img"
          src={`http://covers.openlibrary.org/b/id/${this.props.cover}-${thumbSize}.jpg`}
          onLoad={() => this.imageHasLoaded()}
        />
      </figure>
    )
  }
}

export default BookCoverImage;

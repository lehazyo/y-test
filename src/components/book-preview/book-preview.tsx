import React, { FC } from 'react';
import { BookCoverEmpty } from './book-cover/book-cover-empty/book-cover-empty';
import { BookCover } from './book-cover/book-cover';
import './book-preview.scss';

export interface BookPreviewProps {
  title: string;
  cover_i?: number;
  author_name: string[];
}

export const BookPreview: FC<BookPreviewProps> = ({
  title,
  cover_i,
  author_name,
}) => {
  const coverToRender = () => (cover_i === undefined)
    ? <BookCoverEmpty />
    : <BookCover cover_i={cover_i} />;

  const authorsBlock = () => (author_name.length)
    ? <div className="book-preview--authors">{author_name.join(', ')}</div>
    : null;

  return (
    <li className="book-preview--wrapper">
      {coverToRender()}
      <div className="book-preview--info">
        <header className="book-preview--title">{title}</header>
        {authorsBlock}
      </div>
    </li>
  );
}
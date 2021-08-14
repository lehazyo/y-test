import React, { FC } from 'react';
import { AuthorsBlock } from '../authors-block/authors-block';
import { BookCover } from '../book-cover/book-cover';
import './book-preview.scss';

export interface BookPreviewProps {
  title: string;
  authors?: string[];
  cover?: number;
  onClick?: () => void;
}

export const BookPreview: FC<BookPreviewProps> = ({
  title,
  cover,
  authors,
  onClick,
}) => (
  <li
    className="book-preview--wrapper"
    onClick={onClick}
  >
    <BookCover title={title} cover={cover} />
    <div className="book-preview--info">
      <header className="book-preview--title">{title}</header>
      <AuthorsBlock authors={authors} />
    </div>
  </li>
);
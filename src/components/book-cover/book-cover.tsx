import React, { FC } from 'react';
import { BookCoverEmpty } from './book-cover-empty/book-cover-empty';
import { BookCoverImage } from './book-cover-image/book-cover-image';

export interface BookCoverProps {
  title: string;
  cover?: number;
  details?: boolean;
}

export const BookCover: FC<BookCoverProps> = ({ title, cover, details }) => (cover === undefined)
  ? <BookCoverEmpty details={details} />
  : <BookCoverImage title={title} cover={cover} details={details} />;
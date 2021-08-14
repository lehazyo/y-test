import React, { FC } from 'react';
import { ReactComponent as IcOpenBook } from '../../../icons/open-book.svg';
import './book-cover-empty.scss';

export interface BookCoverEmptyProps {
  details?: boolean;
}

export const BookCoverEmpty: FC<BookCoverEmptyProps> = ({ details }) => (
  <figure className={`book-cover book-cover-empty--wrapper${details ? ' book-cover_details' : ''}`}>
    <IcOpenBook className="book-cover-empty--icon" />
  </figure>
)